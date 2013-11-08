/*
 * A TileLayer that is classified by type.
 * Used by L.KSP.Map to store the active type of base layer
 * and restore it when the body is changed.
 *
 * This class uses the Proj4Leaflet plugin until leaflet gets
 * better support for projections upstream
 */
L.KSP.TileLayer = L.Proj.TileLayer.TMS.extend({
	statics: {
		TYPE_SATELLITE: 0,
		TYPE_COLORRELIEF: 1,
		TYPE_SLOPE: 2,
		TYPE_BIOME: 3,
		DEFAULT_URL: "http://tiles.kerbalmaps.com/{body}/{style}/{z}/{x}/{y}.png"
	},

	options: {
		continuousWorld: false,
		noWrap: false,
		minZoom: 0,
		maxZoom: 5,
		attribution: "Map data &copy; Joel Pedraza"
	},

	initialize: function (type, url, crs, options) {
		L.Util.setOptions(this, options);
		this._type = type;
		L.Proj.TileLayer.TMS.prototype.initialize.call(this, url, crs, this.options);
	}
});

L.KSP.tileLayer = function (type, url, crs, options) {
	return new L.KSP.TileLayer(type, url, crs, options);
};

