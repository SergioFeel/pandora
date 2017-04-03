var ourCoords = {
	latitude: 47.624851,
	longitude: -122.52099
};

window.onload = getMyLocation;

function getMyLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(displayLocation, displayError);
	} else {
		alert('Oops, no geolocation support');
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	var div = document.getElementById('location');
	div.innerHTML = 'You`re at latitude: ' + latitude + ' , longitude' + longitude;
}

function displayError(error) {
	var errorTypes = {
		0: 'Unknown error',
		1: 'Permission denied by user',
		2: 'position isn`t available',
		3: 'request timed out'
	};
	var errorMessage = errorTypes[error.code];
	if(error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + ' ' + error.message;
	}
	var div = document.getElementById('location');
	div.innerHTML = errorMessage;
}

function computeDistance(startCoords, destCoords) {
	var startLatRads = degreesToRadians(startCoords.latitude);
	var startLongRads = degreesToRadians(startCoords.longitude);
	var destLatRads = degreesToRadians(destCoords.latitude);
	var destLongRads = degreesToRadians(destCoords.longitude);
	
	var Radius - 6371;
	var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
					Math.cos(startLatRads) * Math.cos(destLatRads) * 
					Math.cos(startLongRads - destLongRads)) * Radius;

return distance;
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;
	
	var div = document.getElementById('location');
	div.innerHTML = 'You`re at latitude: ' + latitude + ' , longitude: ' + longitude;
	
	var km = computeDistance(position.coords, ourCoords);
	var div = document.getElementById('distance');
	distance.innerHTML = 'You`re ' + km + 'km from the HQ';
	showMap(position.coords);
}

var map;

function showMap(coords) {
	var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude); 
	var mapOptions = {
		zoom: 10,
		center: googleLatAndLong, 
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var mapDiv = document.getElementById('map');
	map = new google.maps.Map(mapDiv, mapOptions);
}