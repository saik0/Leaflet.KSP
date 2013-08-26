/*
 * A LayerGroup that is classified by type.
 * Used by L.KSP.Map to store the active types of overlays
 * and restore them when the body is changed.
 */
L.KSP.LayerGroup = L.LayerGroup.extend({
	statics: {
		TYPE_SPACECENTER: 0,
		TYPE_ANOMALY: 1,
		TYPE_POI: 3
	},

	initialize: function (type, layers) {
		this._type = type;
		L.LayerGroup.prototype.initialize.call(this, layers);
	}
});

L.KSP.layerGroup = function (type, layers) {
	return new L.KSP.LayerGroup(type, layers);
};

