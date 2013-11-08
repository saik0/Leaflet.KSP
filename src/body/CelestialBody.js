/*
 * Main class that defines the KSP Planets and Moons
 * Two way relationships modeled between parents and children
 * Implenets ILayer interface, can be added to a map like a Layer
 */
L.KSP.CelestialBody = L.Class.extend({
	initialize: function (data) {
		// data validation, with some sane fallback values
		if (!data.hasOwnProperty("id")) { throw new Error("must specify id"); }
		if (!data.hasOwnProperty("name")) { throw new Error("must specify name"); }
		if (!data.hasOwnProperty("crs")) { this.crs = L.KSP.CRS.EPSG4326; }
		else if (!(data.crs instanceof L.Proj.CRS.TMS)) { throw new Error("crs is not an instance of L.Proj.CRS.TMS"); }
		if (!data.hasOwnProperty("radius")) { this.radius = 1; }
		if (!data.hasOwnProperty("thumbnail")) { this.thumbnail = "http://static.kerbalmaps.com/images/body-unknown.png"; }
		if (!data.hasOwnProperty("baseLayers")) { this.baseLayers = {}; }

		L.Util.extend(this, data);
	},

	addTo: function (map) {
		var oldBody = map._body,
			layer;
		map._body = this;
		map.fire("bodychangestart", {body: this, oldBody: oldBody});

		if (oldBody) {
			for (layer in oldBody.baseLayers) {
				if (oldBody.baseLayers.hasOwnProperty(layer)) {
					map.removeLayer(oldBody.baseLayers[layer]);
				}
			}
			for (layer in oldBody.overlays) {
				if (oldBody.overlays.hasOwnProperty(layer)) {
					map.removeLayer(oldBody.overlays[layer]);
				}
			}
			for (layer in oldBody.grids) {
				if (oldBody.grids.hasOwnProperty(layer)) {
					map.removeLayer(oldBody.grids[layer]);
				}
			}
		}

		// restore base layer type
		var baseLayer = this.defaultLayer || this.baseLayers.Satellite;
		if (baseLayer) {
			for (layer in this.baseLayers) {
				if (this.baseLayers.hasOwnProperty(layer) &&
						this.baseLayers[layer]._type === map.options.baseLayerType) {
					baseLayer = this.baseLayers[layer];
					break;
				}
			}
			map.addLayer(baseLayer);
			map.fire("baselayerchange", {layer: baseLayer});
		}

		for (layer in this.overlays) {
			if (this.overlays.hasOwnProperty(layer) &&
					map.options.overlayTypes.indexOf(this.overlays[layer]._type) >= 0) {
				map.addLayer(this.overlays[layer]);
				map.fire("layeradd", {layer: this.overlays[layer]});
			}
		}
		map.fire("bodychangeend", {body: this, oldBody: oldBody});

		for (layer in this.grids) {
			if (this.grids.hasOwnProperty(layer)) {
				map.addLayer(this.grids[layer]);
				map.fire("layeradd", {layer: this.grids[layer]});
			}
		}
	},

	onAdd: function (map) {
		this.addTo(map);
	},

	// untested poor man's way of implemeting ILayer
	removeFrom: function (map) {
		L.KSP.CelestialBody.DUMMY.addTo(map);
	},

	onRemove: function (map) {
		this.removeFrom(map);
	}
});

L.KSP.celestialBody = function (data) {
	return new L.KSP.CelestialBody(data);
};

// dummy bodies and groups
L.KSP.CelestialBody.DUMMY = L.KSP.celestialBody({
	id: "",
	name: "",
	crs: L.KSP.CRS.EPSG4326
});

L.KSP.CelestialBody.DEFAULT = L.KSP.CelestialBody.DUMMY;
L.KSP.CelestialBody.ALL_PLANETARY = [L.KSP.CelestialBody.DUMMY];
