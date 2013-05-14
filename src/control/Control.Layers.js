/*
 * A CelestialBody aware layer control
 */
L.KSP.Control.Layers = L.Control.Layers.extend({
    onAdd: function (map) {
        var container = L.Control.Layers.prototype.onAdd.call(this, map);
        if(map._body) {
            this.addBody(map._body);
        }
        map.on("bodychangestart", this._onBodyChangeStart, this);
        return container;
    },

    onRemove: function (map) {
        L.Control.Layers.prototype.onRemove.call(this, map);
        map.off("bodychangestart", this._onBodyChangeStart);
    },

    addBody: function (body) {
        var layer;
        for (layer in body.baseLayers) {
            if (body.baseLayers.hasOwnProperty(layer)) {
                this.addBaseLayer(body.baseLayers[layer], layer);
            }
        }
        for (layer in body.overlays) {
            if (body.overlays.hasOwnProperty(layer)) {
                this.addOverlay(body.overlays[layer], layer);
            }
        }
    },
    
    removeBody: function (body) {
        var layer;
        for (layer in body.baseLayers) {
            if (body.baseLayers.hasOwnProperty(layer)) {
                this.removeLayer(body.baseLayers[layer], layer);
            }
        }
        for (layer in body.overlays) {
            if (body.overlays.hasOwnProperty(layer)) {
                this.removeLayer(body.overlays[layer], layer);
            }
        }
    },

    _onBodyChangeStart: function (e) {
        if (e.oldBody) { this.removeBody(e.oldBody); }
        this.addBody(e.body);
    }
});

L.KSP.Map.mergeOptions({
	layersControl: true
});

L.KSP.Map.addInitHook(function () {
	if (this.options.layersControl) {
		this.layersControl = new L.KSP.Control.Layers();
		this.addControl(this.layersControl);
	}
});

L.KSP.control.layers = function (baseLayers, overlays, options) {
    return new L.KSP.Control.Layers(baseLayers, overlays, options);
};

