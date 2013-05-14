var deps = {
	Core: {
		src: [
			'Leaflet.KSP.js',
			'geo/crs/CRS.js',
			'body/CelestialBody.js',
			'map/Map.js'
		],
		desc: 'The core of the plugin, including predifined default CRS, and CelestialBody.'
	},

	TileLayer: {
		src: [
			'layer/tile/TileLayer.js'
		],
		desc: 'Displays tile layers on the map, must be of a specified type.'
	},

	LayerGroup: {
		src: [
			'layer/LayerGroup.js'
		],
		desc: 'Allows grouping several layers to handle them as one, must be of a specified type.'
	},

	Marker: {
		src: [
			'layer/marker/Icon.js'
		],
		desc: 'Markers to put on the map. Includes some predefined plugin specific icons.'
	},

	Legend: {
		src: [ 'model/Legend.js' ],
		desc: 'A very simple data model for the legend control, and predifined legends'
	},

	Control: {
		src: [ 'control/Control.js' ],
		desc: 'A contol to change which CelestialBody is displayed on a map'
	},

	ControlLegend: {
		src: [
			'control/Control.Legend.js'
		],
		desc: 'Displays a simple legend on the map',
		deps: ['Legend']
	},

	ControlScale: {
		src: [
			'control/Control.Scale.js'
		],
		desc: 'A scale control that '
	},
	
	ControlCelestialBody: {
		src: [
			'control/Control.CelestialBody.js'
		],
		desc: 'A control to switch between celestial bodies'
	},
	
	CelestialBodyDefinitions: {
		src: [
			'body/CelestialBody.Definitions.js'
		],
		desc: 'Definitions of all the celestial bodies in Kerbal Space program, tile and marker layers to display them, and a model of their relationships',
		deps: ['TileLayer', 'LayerGroup', 'Legend']
	}
};

if (typeof exports !== 'undefined') {
	exports.deps = deps;
}
