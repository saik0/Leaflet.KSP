/*
 * A body switching control
 *
 * TODO Touch UI controls
 */
L.KSP.Control.CelestialBody = L.Control.extend({
	options: {
		position: "topright",
		collapsed: true
	},

	initialize: function (bodies, options) {
		L.Util.setOptions(this, options);
		this._bodies = bodies;
		this._timeInMillis = new Date().valueOf();
		this._weekInMillis = 604800000;
	},

	onAdd: function () {
		this._initLayout();
		this._update();
		this._map.on("bodychangeend", this._update, this);
		return this._container;
	},

	_initLayout: function () {
		var className = "leaflet-control-celestialbodies",
			container = this._container = L.DomUtil.create("div", className),
			bodies = this._bodies;
		if (this.options.collapsed) {
			L.DomEvent
				.on(container, "mouseover", this._expand, this)
				.on(container, "mouseout", this._collapse, this);
			var link = this._bodiesLink = L.DomUtil.create("a", className + "-toggle", container);
			link.href = "#";
			link.title = "Celestial Bodies";
			L.DomEvent.on(link, "focus", this._expand, this);
			this._map.on("movestart", this._collapse, this);
		}
		var list = this._list = L.DomUtil.create("ul", className + "-list", container);
		// TODO cleanup
		for (var body in bodies) {
			if (bodies.hasOwnProperty(body)) {
				var planetItem = this._addBody(bodies[body], list);
				if (bodies[body].children) {
					var satelliteList = document.createElement("ul");
					for (var satellite in bodies[body].children) {
						if (bodies[body].children.hasOwnProperty(satellite)) {
							this._addBody(bodies[body].children[satellite], satelliteList);
						}
					}
					planetItem.appendChild(satelliteList);
				}
			}
		}
	},

	_update: function () {
		if (this._map._body) {
			this._bodiesLink.style.backgroundImage = "url(\"" + this._map._body.thumbnail + "\")";
		}
	},

	_addBody: function (body, list) {
		var bodyItem = document.createElement("li"),
			thumbnail = document.createElement("img"),
			flag;
		thumbnail.src = body.thumbnail;
		thumbnail.alt = bodyItem.title = body.name;
		if (body.addedOn) {
			if (this._timeInMillis - body.addedOn < this._weekInMillis) {
				flag = L.DomUtil.create("h2", "leaflet-control-celestialbodies-flag leaflet-control-celestialbodies-flag-orange", bodyItem);
				flag.innerHTML = "new";
			} else if (this._timeInMillis - body.lastUpdated < this._weekInMillis) {
				flag = L.DomUtil.create("h2", "leaflet-control-celestialbodies-flag", bodyItem);
				flag.innerHTML = "update";
			}

			var link = document.createElement("a");
			link.href = "#";

			var stop = L.DomEvent.stopPropagation;

			L.DomEvent
				.on(link, "click", stop)
				.on(link, "mousedown", stop)
				.on(link, "dblclick", stop)
				.on(link, "click", L.DomEvent.preventDefault)
				.on(link, "click", function () {body.addTo(this._map); return false; }, this);

			link.appendChild(thumbnail);
			bodyItem.appendChild(link);

		} else {
			L.DomUtil.addClass(thumbnail, "disabled");
			bodyItem.appendChild(thumbnail);
		}

		list.appendChild(bodyItem);
		return bodyItem;
	},

	_expand: function () {
		L.DomUtil.addClass(this._container, "leaflet-control-celestialbodies-expanded");
	},

	_collapse: function () {
		this._container.className = this._container.className.replace(" leaflet-control-celestialbodies-expanded", "");
	}
});

L.KSP.Map.mergeOptions({
	bodyControl: true
});

L.KSP.Map.addInitHook(function () {
	if (this.options.bodyControl) {
		this.bodyControl = new L.KSP.Control.CelestialBody(L.KSP.CelestialBody.ALL_PLANETARY);
		this.addControl(this.bodyControl);
	}
});

L.KSP.control.celestialBody = function (bodies, options) {
	return new L.KSP.Control.CelestialBody(bodies, options);
};

