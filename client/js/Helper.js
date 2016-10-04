function Helper() {}


Helper.prototype.XMLLoad = function (method, url, callback, data, typeHeader) {
	'use strict';
	var xml = new XMLHttpRequest();
	xml.addEventListener('readystatechange', function () {
		if (xml.readyState == 4 && xml.status == 200) {
			callback(xml.responseText);
		}
	});
	xml.open(method, url, true);

	xml.setRequestHeader( 'Content-type', typeHeader || 'application/x-www-form-urlencoded' );
	xml.setRequestHeader( 'Authorization', sessionStorage.getItem('token') );

	xml.send(data || null);
};
