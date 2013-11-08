/*
 * Fetch and parse files using asynchonous javascript and xml
 */

L.Util.AJAX_XML = 0;
L.Util.AJAX_JSON = 1;

L.Util.ajax = function (url, type, cb) {
	var parser, response, request = new L.Util.XmlHttpRequest();
	if (type === L.Util.AJAX_XML) {
		throw new Error("XML parser not yet implemented");
	} else if (type === L.Util.AJAX_JSON) {
		parser = L.Util.Json;
	} else {
		throw new Error("Invalid parser type");
	}
	request.open("GET", url);
	request.onreadystatechange = function () {
		if (request.readyState === 4 && request.status === 200) {
			response = parser.parse(request.responseText);
			cb(response);
		}
	};
	request.send();
};
