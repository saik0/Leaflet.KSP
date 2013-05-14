/*
 * Predifined coordinate reference systems
 *
 * This class uses the Proj4Leaflet plugin until leaflet gets
 * better support for projections upstream
 *
 * Using EPSG:4326, earth equirectangular, as a placeholder for now.
 * TODO Define CRS for each body
 */
L.KSP.CRS = {};
L.KSP.CRS.EPSG4326 = new L.Proj.CRS.TMS(new Proj4js.Proj("EPSG:4326"),
	[-180.0, -90.0, 180, 90], {
		resolutions: [
			0.703125,
			0.3515625,
			0.17578125,
			0.087890625,
			0.0439453125,
			0.02197265625
		]
	}
);

