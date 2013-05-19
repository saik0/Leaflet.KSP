/*
 * Body definitions
 *
 * SPOILER ALERT: These body definitions contain spoilers
 */

L.KSP.CelestialBody.MOHO = L.KSP.celestialBody({
	id: "moho",
	name: "Moho",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-moho.png"
});

L.KSP.CelestialBody.EVE = L.KSP.celestialBody({
	id: "eve",
	name: "Eve",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-eve.png"
});

L.KSP.CelestialBody.GILLY = L.KSP.celestialBody({
	id: "gilly",
	name: "Gilly",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-gilly.png"
});

L.KSP.CelestialBody.KERBIN = L.KSP.celestialBody({
	id: "kerbin",
	name: "Kerbin",
	crs: L.KSP.CRS.EPSG4326,
	radius: 600000,
	addedOn: 1366416000000, // Sat 20 Apr 2013 12:00:00 AM UTC
	lastUpdated: 1366416000000, // Sat 20 Apr 2013 12:00:00 AM UTC
	thumbnail: "http://static.kerbalmaps.com/images/body-kerbin.png",
	baseLayers: {
		"Satellite":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "kerbin",
			style: "sat",
			maxZoom: 4
		}),
		"Color Relief": L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "kerbin",
			style: "color",
			maxZoom: 4,
			legend: {
				"4500 m" : "#FFFFFF",
				"4000 m" : "#E6E1E1",
				"3000 m" : "#C39B87",
				"2000 m" : "#B97855",
				"1000 m" : "#B99B6E",
				"600 m" : "#5A825A",
				"200 m" : "#1E784B",
				"50 m" : "#0A6437",
				"0 m" : "#004120",
				"-500 m" : "#0F4B9B",
				"-100 m" : "#1E6E9B"

			}
		}),
		"Slope":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "kerbin",
			style: "slope",
			maxZoom: 4
			// legend: L.KSP.Legend.SLOPE // messed up this layer, the colors dont properly map to angular degrees
		})
	},
	overlays: {
		"Space Centers": L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_SPACECENTER, [
			L.marker([-0.0969, -74.6004], {icon: L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center</strong><br>-0.0969 : -74.6004"),
			L.marker([20.5829, -146.5116], {icon: L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Kerbal Space Center 2</strong><br>20.5829 : -146.5116"),
			L.marker([-1.5409, -71.9099], {icon: L.KSP.Icon.SPACECENTER}).bindPopup("<strong>Island Airfield</strong><br>-1.5409 : -71.9099")
		]),
		"Anomalies": L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY, [
			L.marker([0.1023, -74.5684], {icon: L.KSP.Icon.ANOMALY}).bindPopup("0.1023 : -74.5684"),
			L.marker([20.6709, -146.4968], {icon: L.KSP.Icon.ANOMALY}).bindPopup("20.6709 : -146.4968"),
			L.marker([35.5705, -74.9773], {icon: L.KSP.Icon.ANOMALY}).bindPopup("35.5705 : -74.9773"),
			L.marker([-0.6402, -80.7668], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-0.6402 : -80.7668"),
			L.marker([-28.8083, -13.4401], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-28.8083 : -13.4401"),
			L.marker([-6.5057, -141.6856], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-6.5057 : -141.6856"),
			L.marker([81.9551, -128.518], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-81.9551 : -128.518")
		])
	}
});

L.KSP.CelestialBody.MUN = L.KSP.celestialBody({
	id: "mun",
	name: "Mun",
	crs: L.KSP.CRS.EPSG4326,
	radius: 200000,
	addedOn: 1368230400000, //Sat 11 May 2013 12:00:00 AM UTC
	lastUpdated: 1368144000000, //Fri 10 May 2013 12:00:00 AM UTC
	thumbnail: "http://static.kerbalmaps.com/images/body-mun.png",
	baseLayers: {
		"Satellite":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "mun",
			style: "sat"
		}),
		"Color Relief": L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "mun",
			style: "color",
			legend: {
				"3150 m" : "#EBEBEB",
				"-180 m" : "#232323"
			}
		}),
		"Slope":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			body: "mun",
			style: "slope",
			legend: L.KSP.Legend.SLOPE
		})
	},
	overlays: {
		"Anomalies": L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY, [
			L.marker([-9.8314, 25.9177], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-9.8314 : 25.9177"), //monolith
			L.marker([-82.2063, 102.9305], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-82.2063 : 102.9305"), //monolith
			L.marker([57.6604, 9.1422], {icon: L.KSP.Icon.ANOMALY}).bindPopup("57.6604 : 9.1422"), //monolith
			L.marker([2.4695, 81.5133], {icon: L.KSP.Icon.ANOMALY}).bindPopup("2.4695 : 81.5133"), // rockarch
			L.marker([12.4432, 39.178], {icon: L.KSP.Icon.ANOMALY}).bindPopup("12.4432 : 39.1780"), // rockarch
			L.marker([-12.4431, -140.822], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-12.4431 : -140.8220"), // rockarch
			L.marker([0.7027, 22.747], {icon: L.KSP.Icon.ANOMALY}).bindPopup("0.7027 : 22.7470"), // armstrongmemorial
			L.marker([-70.9556, -68.1378], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-70.9556,-68.1378") // ufo
		])
	}
});

L.KSP.CelestialBody.MINMUS = L.KSP.celestialBody({
	id: "minmus",
	name: "Minmus", // used for strings
	crs: L.KSP.CRS.EPSG4326,
	radius: 60000,
	addedOn: 1368230400000, //Sat 11 May 2013 12:00:00 AM UTC
	lastUpdated: 1368230400000, //Sat 11 May 2013 12:00:00 AM UTC
	thumbnail: "http://static.kerbalmaps.com/images/body-minmus.png",
	baseLayers: {
		"Satellite":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "sat",
			body: "minmus"
		}),
		"Color Relief": L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "color",
			body: "minmus",
			legend: {
				"5750 m" : "#414B41",
				"2500 m" : "#BEE6C3",
				"1 m" : "#96CDB4",
				"0 m" : "#87B9A5"
			}
		}),
		"Slope":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "slope",
			body: "minmus",
			legend: L.KSP.Legend.SLOPE
		})
	},
	overlays: {
		"Anomalies": L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY, [
			L.marker([23.7768, 60.0462], {icon: L.KSP.Icon.ANOMALY}).bindPopup("23.7768 : 60.0462") //monolith
		])
	}
});

L.KSP.CelestialBody.DUNA = L.KSP.celestialBody({
	id: "duna",
	name: "Duna",
	crs: L.KSP.CRS.EPSG4326,
	radius: 320000,
	addedOn: 1368835200000, //Sat 18 May 2013 12:00:00 AM UTC
	lastUpdated: 1368835200000, //Sat 18 May 2013 12:00:00 AM UTC
	thumbnail: "http://static.kerbalmaps.com/images/body-duna.png",
	baseLayers: {
		"Satellite":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "sat",
			body: "duna"
		}),
		"Color Relief": L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "color",
			body: "duna",
			legend: {
				"4800 m" : "#C3A082",
				"4000 m" : "#966446",
				"3000 m" : "#733219",
				"2000 m" : "#501E14",
				"1000 m" : "#3C140F",
				"0 m" : "#280F0A"
			}
		}),
		"Slope":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "slope",
			body: "duna",
			legend: L.KSP.Legend.SLOPE
		})
	},
	overlays: {
		"Anomalies": L.KSP.layerGroup(L.KSP.LayerGroup.TYPE_ANOMALY, [
			L.marker([17.0483, -85.4717], {icon: L.KSP.Icon.ANOMALY}).bindPopup("17.0483 : -85.4717"), //face
			L.marker([-30.3525, -28.6828], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-30.3525 : -28.6828"), //msl camera
			L.marker([-66.1344, -160.7432], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-66.1344 : -160.7432") //pyramid sstv
			// though it's defined in game data there does not appear to be anything here
			// L.marker([-0.0005, -31.8825], {icon: L.KSP.Icon.ANOMALY}).bindPopup("-0.0005 : -31.8825") //pyramid
		])
	}
});

L.KSP.CelestialBody.IKE = L.KSP.celestialBody({
	id: "ike",
	name: "Ike",
	crs: L.KSP.CRS.EPSG4326,
	radius: 130000,
	addedOn: 1368835200000, //Sat 18 May 2013 12:00:00 AM UTC
	lastUpdated: 1368835200000, //Sat 18 May 2013 12:00:00 AM UTC
	thumbnail: "http://static.kerbalmaps.com/images/body-ike.png",
	baseLayers: {
		"Satellite":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SATELLITE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "sat",
			body: "ike"
		}),
		"Color Relief": L.KSP.tileLayer(L.KSP.TileLayer.TYPE_COLORRELIEF,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "color",
			body: "ike",
			legend: {
				"13000 m" : "#828282",
				"11000 m" : "#6E6E6E",
				"9000 m" : "#5A5A5A",
				"7000 m" : "#464646",
				"5000 m" : "#323232",
				"2500 m" : "#191919",
				"70 m" : "#070707"
			}
		}),
		"Slope":  L.KSP.tileLayer(L.KSP.TileLayer.TYPE_SLOPE,
				L.KSP.TileLayer.DEFAULT_URL,
				L.KSP.CRS.EPSG4326, {
			style: "slope",
			body: "ike",
			legend: L.KSP.Legend.SLOPE
		})
	},
	overlays: {}
});

L.KSP.CelestialBody.DRES = L.KSP.celestialBody({
	id: "dres",
	name: "Dres",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-dres.png"
});

L.KSP.CelestialBody.JOOL = L.KSP.celestialBody({
	id: "jool",
	name: "Jool",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-jool.png"
});

L.KSP.CelestialBody.LAYTHE = L.KSP.celestialBody({
	id: "laythe",
	name: "Laythe",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-laythe.png"
});

L.KSP.CelestialBody.VALL = L.KSP.celestialBody({
	id: "vall",
	name: "Vall",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-vall.png"
});

L.KSP.CelestialBody.TYLO = L.KSP.celestialBody({
	id: "tylo",
	name: "Tylo",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-tylo.png"
});

L.KSP.CelestialBody.BOP = L.KSP.celestialBody({
	id: "bop",
	name: "Bop",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-bop.png"
});

L.KSP.CelestialBody.POL = L.KSP.celestialBody({
	id: "pol",
	name: "Pol",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-pol.png"
});
L.KSP.CelestialBody.EELOO = L.KSP.celestialBody({
	id: "eeloo",
	name: "Eeloo",
	crs: L.KSP.CRS.EPSG4326,
	thumbnail: "http://static.kerbalmaps.com/images/body-eeloo.png"
});

// Objects are unordered so we explicly define the default layer
L.KSP.CelestialBody.KERBIN.defaultLayer = L.KSP.CelestialBody.KERBIN.baseLayers.Satellite;
L.KSP.CelestialBody.MUN.defaultLayer = L.KSP.CelestialBody.MUN.baseLayers.Satellite;
L.KSP.CelestialBody.MINMUS.defaultLayer = L.KSP.CelestialBody.MINMUS.baseLayers.Satellite;

// Model two way relationships between bodies
L.KSP.CelestialBody.EVE.children = [L.KSP.CelestialBody.GILLY];
L.KSP.CelestialBody.KERBIN.children = [L.KSP.CelestialBody.MUN, L.KSP.CelestialBody.MINMUS];
L.KSP.CelestialBody.DUNA.children = [L.KSP.CelestialBody.IKE];
L.KSP.CelestialBody.JOOL.children = [
	L.KSP.CelestialBody.LAYTHE,
	L.KSP.CelestialBody.VALL,
	L.KSP.CelestialBody.TYLO,
	L.KSP.CelestialBody.BOP,
	L.KSP.CelestialBody.POL
];

L.KSP.CelestialBody.GILLY.parent = L.KSP.CelestialBody.EVE;
L.KSP.CelestialBody.MUN.parent = L.KSP.CelestialBody.MINMUS.parent = L.KSP.CelestialBody.KERBIN;
L.KSP.CelestialBody.IKE.parent = L.KSP.CelestialBody.DUNA;
L.KSP.CelestialBody.LAYTHE.parent =
	L.KSP.CelestialBody.VALL.parent =
	L.KSP.CelestialBody.TYLO.parent =
	L.KSP.CelestialBody.BOP.parent =
	L.KSP.CelestialBody.POL.parent =
	L.KSP.CelestialBody.JOOL;

/*
 * An array with references to the all planets and dwarf planets, ascending by proximity to the star
 * Replaces the default (dummy) object
 */
L.KSP.CelestialBody.ALL_PLANETARY = [
	L.KSP.CelestialBody.MOHO,
	L.KSP.CelestialBody.EVE,
	L.KSP.CelestialBody.KERBIN,
	L.KSP.CelestialBody.DUNA,
	L.KSP.CelestialBody.DRES,
	L.KSP.CelestialBody.JOOL,
	L.KSP.CelestialBody.EELOO
];

// Sets the default body to Kerbin
L.KSP.Map.addInitHook(function () {
	this.options.layers = [L.KSP.CelestialBody.KERBIN];
});

