var gmap = document.getElementById('map');
var map;
var settings = {
	home: {
		latitude: 55.708411,
		longitude: 37.658046
	},
	icon_url: '',
	zoom: 16
}

var coords = new google.maps.LatLng(settings.home.latitude, settings.home.longitude);

var options = {
	zoom: settings.zoom,
	scrollwheel: false,
	center: coords,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	mapTypeControl: true,
	scaleControl: true,
	streetViewControl: false,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.DEFAULT
	},
	overviewMapControl: true
	/*styles: [{
	 "featureType": "water",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#e9e9e9"
	 }, {
	 "lightness": 17
	 }]
	 }, {
	 "featureType": "landscape",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#f5f5f5"
	 }, {
	 "lightness": 20
	 }]
	 }, {
	 "featureType": "road.highway",
	 "elementType": "geometry.fill",
	 "stylers": [{
	 "color": "#ffffff"
	 }, {
	 "lightness": 17
	 }]
	 }, {
	 "featureType": "road.highway",
	 "elementType": "geometry.stroke",
	 "stylers": [{
	 "color": "#ffffff"
	 }, {
	 "lightness": 29
	 }, {
	 "weight": 0.2
	 }]
	 }, {
	 "featureType": "road.arterial",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#ffffff"
	 }, {
	 "lightness": 18
	 }]
	 }, {
	 "featureType": "road.local",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#ffffff"
	 }, {
	 "lightness": 16
	 }]
	 }, {
	 "featureType": "poi",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#f5f5f5"
	 }, {
	 "lightness": 21
	 }]
	 }, {
	 "featureType": "poi.park",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#dedede"
	 }, {
	 "lightness": 21
	 }]
	 }, {
	 "elementType": "labels.text.stroke",
	 "stylers": [{
	 "visibility": "on"
	 }, {
	 "color": "#ffffff"
	 }, {
	 "lightness": 16
	 }]
	 }, {
	 "elementType": "labels.text.fill",
	 "stylers": [{
	 "saturation": 36
	 }, {
	 "color": "#333333"
	 }, {
	 "lightness": 40
	 }]
	 }, {
	 "elementType": "labels.icon",
	 "stylers": [{
	 "visibility": "off"
	 }]
	 }, {
	 "featureType": "transit",
	 "elementType": "geometry",
	 "stylers": [{
	 "color": "#f2f2f2"
	 }, {
	 "lightness": 19
	 }]
	 }, {
	 "featureType": "administrative",
	 "elementType": "geometry.fill",
	 "stylers": [{
	 "color": "#fefefe"
	 }, {
	 "lightness": 20
	 }]
	 }, {
	 "featureType": "administrative",
	 "elementType": "geometry.stroke",
	 "stylers": [{
	 "color": "#fefefe"
	 }, {
	 "lightness": 17
	 }, {
	 "weight": 1.2
	 }]
	 }]*/
};

map = new google.maps.Map(gmap, options);

var end = new google.maps.Marker({
	position: new google.maps.LatLng(55.712169, 37.657553),
	map: map,
	icon: {
		url: 'http://www.supah.it/dribbble/020/end.png?v=3',
		origin: new google.maps.Point(0, 0)
	},
	draggable: false
});

var start = new google.maps.Marker({
	position: new google.maps.LatLng(55.70843, 37.6576228),
	map: map,
	icon: {
		url: 'http://www.supah.it/dribbble/020/start.png?v=3',
		origin: new google.maps.Point(0, 0)
	},
	draggable: false
});

var info = new google.maps.InfoWindow({
	content: settings.text
});

var runningCoords = [{
	lat: 55.7084648,
	lng: 37.6581888
}, {
	lat: 55.708562,
	lng: 37.658243
}, {
	lat: 55.708609,
	lng: 37.658205
}, {
	lat: 55.708665,
	lng: 37.658198
}, {
	lat: 55.708657,
	lng: 37.658200
}, {
	lat: 55.708714,
	lng: 37.658203
}, {
	lat: 55.708759,
	lng: 37.658203
}, {
	lat: 55.708815,
	lng: 37.658207
},{
	lat: 55.708866,
	lng: 37.658207
},{
	lat: 55.708920,
	lng: 37.658215
},{
	lat: 55.708866,
	lng: 37.658215
},{
	lat: 55.708866,
	lng: 37.658207
}, {
	lat: 55.712330,
	lng: 37.658236
}, {
	lat: 55.712337,
	lng: 37.658186
}, {
	lat: 55.712169,
	lng: 37.657553
}];

/* No Animation */
/*
 var runPath = new google.maps.Polyline({
 path: runningCoords,
 geodesic: true,
 strokeColor: '#58a7e2',
 strokeOpacity: 1.0,
 strokeWeight: 3
 });
 runPath.setMap(map);
 */

/* Animation */
var i = 0;

function animPath() {

	if (i > runningCoords.lenght) {
		return false;
	}

	dept_lat = runningCoords[i].lat;
	dept_lng = runningCoords[i].lng;
	arr_lat = runningCoords[i + 1].lat;
	arr_lng = runningCoords[i + 1].lng;

	var departure = new google.maps.LatLng(dept_lat, dept_lng); //Set to whatever lat/lng you need for your departure location
	var arrival = new google.maps.LatLng(arr_lat, arr_lng); //Set to whatever lat/lng you need for your arrival location
	var line = new google.maps.Polyline({
		path: [departure, departure],
		strokeColor: "#572642",
		strokeOpacity: 1,
		strokeWeight: 3,
		geodesic: true, //set to false if you want straight line instead of arc
		map: map,
	});
	var step = 0;
	var numSteps = 25; //Change this to set animation resolution
	var timePerStep = 5; //Change this to alter animation speed
	var interval = setInterval(function () {
		step += 1;
		if (step > numSteps) {
			clearInterval(interval);
			i++;
			animPath();
		} else {
			var are_we_there_yet = google.maps.geometry.spherical.interpolate(departure, arrival, step / numSteps);
			line.setPath([departure, are_we_there_yet]);
		}
	}, timePerStep);
}

google.maps.event.addListenerOnce(map, 'idle', function () {
	setTimeout(init, 300);
});

function init() {
	animPath();
	/* Number animation */
	$('.info-box mark span').each(function () {
		$(this).prop('Counter', 0).animate({
			Counter: parseFloat($(this).text()).toFixed(1)
		}, {
			duration: 3000,
			easing: 'easeInOutQuart',
			step: function (now) {
				$(this).text(Math.round(now * 10) / 10);
			}
		});
	});
}
