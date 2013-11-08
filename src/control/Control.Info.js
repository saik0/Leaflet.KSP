/*
 * Display some information about the point under the cursor
 */

/* jshint bitwise: false*/

L.KSP.Control.Info = L.Control.extend({
	options: {
		position: "bottomleft",
		dms: false
	},

	_decFormatter: function(latlng) {
		return latlng.lat.toFixed(4) + "<br>" + latlng.lng.toFixed(4);
	},

	_dmsFormatter: function(latlng) {
		function decToDMS(coord) {
			var dms = "<td>" + (coord | 0) + "&deg; </td>";
			coord = (coord - (coord | 0)) * 60;
			dms += "<td>" + (coord | 0) + "&#39; </td>"; //apostrophe entity
			coord = coord % 1 * 60;
			dms += "<td>" + Math.round(coord) + "&quot;</td>";
			return dms;
		}

		return "<table><tr>" +
		       decToDMS(Math.abs(latlng.lat)) + "<td>" + (latlng.lat >= 0 ? " N" : " S") + "</td>" +
			   "</tr><tr>" +
			   decToDMS(Math.abs(latlng.lng)) + "<td>" + (latlng.lng >= 0 ? " E" : " W") + "</td>" +
			   "</tr></table>";
	},

	onAdd: function (map) {
		var self = this;
		this._container = L.DomUtil.create("div", "leaflet-control-info leaflet-control-info-visible");
		this._position = L.DomUtil.create("div", "latlng", this._container);
		L.DomUtil.create("br", null, this._container);
		this._position.innerHTML = "Unavailable<br>Unavailable";
		this._position.onclick = function(){ self._togglePositionFormat(); };
		this._biome = L.DomUtil.create("span", "biome-name", this._container);
		L.DomUtil.create("br", null, this._container);
		//this._container.innerHTML += "Elevation: ";
		this._elevation = L.DomUtil.create("span", "elevation", this._container);
		L.DomUtil.create("br", null, this._container);
		this._slope = L.DomUtil.create("span", "slope", this._container);
		this._reset();
		map.on("bodychangeend", this._reset, this);
		map.on("biomeover", this._onBiomeChange, this);
		map.on("elevationover", this._onElevationChange, this);
		map.on("slopeover", this._onSlopeChange, this);
		map.on("mousemove", this._onMouseMove, this);

		return this._container;
	},

	onRemove: function (map) {
		map.off("bodychangeend", this._reset);
		map.off("biomeover", this._onBiomeChange);
		map.off("elevationover", this._onElevationChange);
		map.off("slopeover", this._onSlopeChange);
		map.off("mousemove", this._onMouseMove);
	},

	_onMouseMove: function (e) {
		this._latlng = e.latlng;
		this._updatePosition();
	},

	_updatePosition: function () {
		this._position.innerHTML = this.options.dms ? this._dmsFormatter(this._latlng) : this._decFormatter(this._latlng);
	},

	_togglePositionFormat: function () {
		this.options.dms = !this.options.dms;
		this._updatePosition();
	},

	_onBiomeChange: function (e) {
		this._biome.innerHTML = e.data || "Biome Unavailable";
	},

	_onElevationChange: function (e) {
		//console.log(e);
		var elevation = e.data !== null ? e.data + " m" : "None";
		this._elevation.innerHTML = "Elevation: " + elevation;
	},

	_onSlopeChange: function (e) {
		//console.log(e);
		var slope = e.data !== null ? e.data + "&deg;" : "None";
		this._slope.innerHTML = "Slope: " + slope;
	},

	_reset: function () {
		this._biome.innerHTML = "Biome Unavailable";
		this._elevation.innerHTML = "Elevation: None";
		this._slope.innerHTML = "Slope: None";
	}
});

L.Map.mergeOptions({
	infoControl: true
});

L.Map.addInitHook(function () {
	if (this.options.infoControl) {
		this.infoControl = new L.KSP.Control.Info();
		this.addControl(this.infoControl);
	}
});

L.Control.info = function (map) {
	return new L.KSP.Control.Info(map);
};

