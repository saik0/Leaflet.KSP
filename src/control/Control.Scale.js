/*
 * A Celestial body aware scale control
 */
L.KSP.Control.Scale = L.Control.Scale.extend({
	options: {
		imperial: false
	},

	onAdd: function (map) {
		this._radius = 0;
		if (map._body) { this._radius = map._body.radius; }
		var container = L.Control.Scale.prototype.onAdd.call(this, map);
		map.on("bodychangeend", this._onBodyChangeEnd, this);
		return container;
	},

	onRemove: function (map) {
		L.Control.Scale.prototype.onRemove.call(this, map);
		map.off("bodychangeend", this._onBodyChangeEnd);
	},

	_onBodyChangeEnd: function (e) {
		this._radius = e.body.radius;
		this._update();
	},

	/*
	 * Equal to L.Control.Scale.update() except for the dist definition
	 */
	_update: function () {
		var bounds = this._map.getBounds(),
			centerLat = bounds.getCenter().lat,
			halfWorldMeters = this._radius * Math.PI * Math.cos(centerLat * Math.PI / 180),
			dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

			size = this._map.getSize(),
			options = this.options,
			maxMeters = 0;

		if (size.x > 0) {
			maxMeters = dist * (options.maxWidth / size.x);
		}

		this._updateScales(options, maxMeters);
	}
});

L.KSP.Map.mergeOptions({
	scaleControl: false
});

L.KSP.Map.addInitHook(function () {
	if (this.options.scaleControl) {
		this.scaleControl = new L.KSP.Control.Scale();
		this.addControl(this.scaleControl);
	}
});

L.KSP.control.scale = function (options) {
	return new L.KSP.Control.Scale(options);
};

