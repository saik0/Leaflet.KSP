/*
 * A Map that tracks CelestialBody as well as the types of
 * TileLayer and LayerGroup the user has enabled.
 */
L.KSP.Map = L.Map.extend({
	options: {
		crs: L.KSP.CRS.EPSG4326,
		continuousWorld: true,
		layers: [L.KSP.CelestialBody.DEFAULT],
		baseLayerType: 0,
		overlayTypes: []
	},

	initialize: function (id, options) {
		L.Util.setOptions(this, options);

		this.startTrackingLayerState();
		this.on("bodychangestart", this._onBodyChangeStart)
			.on("bodychangeend", this._onBodyChangeEnd);

		L.Map.prototype.initialize.call(this, id, this.options);
	},

	clampZoom: function () {
		var zoom = this.getZoom(),
			minZoom = this.getMinZoom(),
			maxZoom = this.getMaxZoom();
		if (zoom < minZoom) {
			this.setZoom(minZoom);
		} else if (zoom > maxZoom) {
			this.setZoom(maxZoom);
		} else {
			// invalidate the zoom control in case the min and max values have changed
			this.fire("zoomend", this);
		}
	},

	_onBodyChangeStart: function () {
		this.stopTrackingLayerState();
	},

	_onBodyChangeEnd: function () {
		this.clampZoom();
		this.startTrackingLayerState();
	},

	_onLayerStateChange: function (e) {
		if (e.type === "layeradd") {
			if (e.layer instanceof L.KSP.TileLayer) {
				this.options.baseLayerType = e.layer._type;
			} else if (e.layer instanceof L.KSP.LayerGroup) {
				if (this.options.overlayTypes.indexOf(e.layer._type) < 0) {
					this.options.overlayTypes.push(e.layer._type);
				}
			}
		} else { // layerremoved
			if (e.layer instanceof L.KSP.LayerGroup) {
				var type = e.layer._type,
					types = this.options.overlayTypes,
					i,
					v;

				for (i = types.length - 1; i >= 0; i--) {
					v = types[i];
					if (v === type) {
						types.splice(i, 1);
					}
				}
			}
		}
	},

	startTrackingLayerState: function () {
		this.on("layeradd", this._onLayerStateChange)
			.on("layerremove", this._onLayerStateChange);
	},

	stopTrackingLayerState: function () {
		this.off("layeradd", this._onLayerStateChange)
			.off("layerremove", this._onLayerStateChange);
	}
});

L.KSP.map = function (id, options) {
	return new L.KSP.Map(id, options);
};

