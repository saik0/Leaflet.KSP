// TODO seperate into different compilation units

/*
Copyright 2012 David Leaver

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

author: David Leaver
https://github.com/danzel/Leaflet.utfgrid
*/

/*
Modified for non-wrapping equirectangular projection (original hardcoded to wrap)
spherical mercator
TODO: Use leaflet projections and CRS when they are fixed upstream, hopefully 0.7
*/
L.UtfGrid = L.Class.extend({
	includes: L.Mixin.Events,
	options: {
		subdomains: "abc",

		minZoom: 0,
		maxZoom: 18,
		tileSize: 256,

		resolution: 4,

		useJsonP: true,
		pointerCursor: true
	},

	//The thing the mouse is currently on
	_mouseOn: null,

	initialize: function (url, options) {
		L.Util.setOptions(this, options);

		this._url = url;
		this._cache = {};

		//Find a unique id in window we can use for our callbacks
		//Required for jsonP
		var i = 0;
		while (window["lu" + i]) {
			i++;
		}
		this._windowKey = "lu" + i;
		window[this._windowKey] = {};

		var subdomains = this.options.subdomains;
		if (typeof this.options.subdomains === "string") {
			this.options.subdomains = subdomains.split("");
		}
	},

	onAdd: function (map) {
		this._map = map;
		this._container = this._map._container;

		this._update();

		var zoom = this._map.getZoom();

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		map.on("click", this._click, this);
		map.on("mousemove", this._move, this);
		map.on("moveend", this._update, this);
	},

	onRemove: function () {
		var map = this._map;
		this._mouseOn = null;
		map.off("click", this._click, this);
		map.off("mousemove", this._move, this);
		map.off("moveend", this._update, this);
	},

	_click: function (e) {
		this.fire("click", this._objectForEvent(e));
	},

	_move: function (e) {
		var on = this._objectForEvent(e);

		if (on.data !== this._mouseOn) {
			if (this._mouseOn) {
				this.fire("mouseout", { latlng: e.latlng, data: this._mouseOn });
				if (this.options.pointerCursor) {
					this._container.style.cursor = "";
				}
			}

			this.fire("mouseover", on);
			if (this.options.pointerCursor) {
				this._container.style.cursor = "pointer";
			}

			this._mouseOn = on.data;
		}
		this.fire("mousemove", on);
	},

	_objectForEvent: function (e) {
		var map = this._map,
		    point = map.project(e.latlng),
		    tileSize = this.options.tileSize,
		    resolution = this.options.resolution,
		    x = Math.floor(point.x / tileSize),
		    y = Math.floor(point.y / tileSize),
		    gridX = Math.floor((point.x - (x * tileSize)) / resolution),
		    gridY = Math.floor((point.y - (y * tileSize)) / resolution),
			maxY = (tileSize * Math.pow(2, map.getZoom())) / tileSize,
			maxX = maxY * 2;

		if (x >= maxX || x < 0 || y >= maxY || y < 0) {
			return { latlng: e.latlng, data: null};
		}

		var data = this._cache[map.getZoom() + "_" + x + "_" + y];
		if (!data) {
			return { latlng: e.latlng, data: null };
		}

		var idx = this._utfDecode(data.grid[gridY].charCodeAt(gridX)),
		    key = data.keys[idx],
		    result = data.data[key];

		if (!data.data.hasOwnProperty(key)) {
			result = key;
		}

		return { latlng: e.latlng, data: result};
	},

	//Load up all required json grid files
	//TODO: Load from center etc
	_update: function () {

		var bounds = this._map.getPixelBounds(),
		    zoom = this._map.getZoom(),
		    tileSize = this.options.tileSize;

		if (zoom > this.options.maxZoom || zoom < this.options.minZoom) {
			return;
		}

		var nwTilePoint = new L.Point(
				Math.floor(bounds.min.x / tileSize),
				Math.floor(bounds.min.y / tileSize)),
			seTilePoint = new L.Point(
				Math.floor(bounds.max.x / tileSize),
				Math.floor(bounds.max.y / tileSize)),
			maxY = (tileSize * Math.pow(2, this._map.getZoom())) / tileSize,
			maxX = maxY * 2;

		//Load all required ones
		for (var x = nwTilePoint.x; x <= seTilePoint.x; x++) {
			for (var y = nwTilePoint.y; y <= seTilePoint.y; y++) {

				var xw = (x + maxX) % maxX,
				    yw = (y + maxY) % maxY;
				var key = zoom + "_" + xw + "_" + yw;

				if (!this._cache.hasOwnProperty(key)) {
					this._cache[key] = null;

					if (this.options.useJsonP) {
						this._loadTileP(zoom, xw, yw);
					} else {
						this._loadTile(zoom, xw, yw);
					}
				}
			}
		}
	},

	_loadTileP: function (zoom, x, y) {
		var head = document.getElementsByTagName("head")[0],
		    key = zoom + "_" + x + "_" + y,
		    functionName = "lu_" + key,
		    wk = this._windowKey,
		    self = this;

		var url = L.Util.template(this._url, L.Util.extend({
			s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
			z: zoom,
			x: x,
			y: y,
			cb: wk + "." + functionName
		}, this.options));

		var script = document.createElement("script");
		script.setAttribute("type", "text/javascript");
		script.setAttribute("src", url);

		window[wk][functionName] = function (data) {
			self._cache[key] = data;
			delete window[wk][functionName];
			head.removeChild(script);
		};

		head.appendChild(script);
	},

	_loadTile: function (zoom, x, y) {
		var url = L.Util.template(this._url, L.Util.extend({
			s: L.TileLayer.prototype._getSubdomain.call(this, { x: x, y: y }),
			z: zoom,
			x: x,
			y: y
		}, this.options));

		var key = zoom + "_" + x + "_" + y,
		    self = this,
		    map = this._map;
		map.fire("dataloading");
		L.Util.ajax(url, L.Util.AJAX_JSON, function (data) {
			self._cache[key] = data;
			map.fire("dataload");
		});
	},

	_utfDecode: function (c) {
		if (c >= 93) {
			c--;
		}
		if (c >= 35) {
			c--;
		}
		return c - 32;
	}
});

L.utfGrid = function(url, options) {
	return new L.UtfGrid(url, options);
};

L.KSP.UtfGrid = L.UtfGrid.extend({
	statics: {
		TYPE_ELEVATION: 0,
		TYPE_SLOPE: 1,
		TYPE_BIOME: 2,
		DEFAULT_URL: "http://static.kerbalmaps.com/{body}/{style}/{z}/{x}/{y}.json"
	},

	options: {
		resolution: 2,
		useJsonP: false,
		pointerCursor: false
	},

	initialize: function (type, url, options) {
		L.Util.setOptions(this, options);
		this._type = type;
		L.UtfGrid.prototype.initialize.call(this, url, this.options);
	},

	onAdd: function (map) {
		L.UtfGrid.prototype.onAdd.call(this, map);
		this.on("mouseover", this._onMouseOver, this);
	},

	onRemove: function () {
		L.UtfGrid.prototype.onRemove.call(this);
		this._mouseOn = null;
		this.off("mouseover", this._onMouseOver);
	},

	_onMouseOver: function (e) {
		this._map.fire(this.options.style + "over", e);
	}
});

L.KSP.utfGrid = function(type, url, options) {
	return new L.KSP.UtfGrid(type, url, options);
};
