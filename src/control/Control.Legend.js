/*
 * A simple legend control
 */
L.KSP.Control.Legend = L.Control.extend({
	options: {
		position: "bottomright"
	},

	onAdd: function (map) {
		this._container = L.DomUtil.create("div", "leaflet-control-legend");
		map.on("baselayerchange", this._onLayerChange, this);
		return this._container;
	},

	_update: function (legend) {
		this._container.innerHTML = "";
		if (legend) {
			for (var entry in legend) {
				if (legend.hasOwnProperty(entry)) {
					this._container.innerHTML += "<i style=\"background-color: " + legend[entry] + ";\"></i>" +
						entry + "<br>";
				}
			}
			L.DomUtil.addClass(this._container, "leaflet-control-legend-visible");
		} else {
			this._container.className = this._container.className.replace(" leaflet-control-legend-visible", "");
		}
	},

	_onLayerChange: function (e) {
		this._update(e.layer.options.legend);
	}
});

L.Map.mergeOptions({
	legendControl: true
});

L.Map.addInitHook(function () {
	if (this.options.bodyControl) {
		this.legendControl = new L.KSP.Control.Legend();
		this.addControl(this.legendControl);
	}
});

L.control.legend = function (map) {
	return new L.KSP.Control.Legend(map);
};

