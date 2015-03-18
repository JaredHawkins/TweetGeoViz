/*global google*/

var tgv = tgv || {};

// taken from http://youmightnotneedjquery.com/#ready
(function(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(function() {
  var pins = window.pins || {},
      mapCanvas = document.getElementById('map-canvas'),
      heatmapData = [];

  var mapOptions = {
    center: new google.maps.LatLng(21.2125, 31.1973),
    zoom: 3,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

  var searchBar = new tgv.SearchBar({
    componentSelector: '#searchBar'
  });
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBar.view.el);

  //create heatmap layer
  for (var i = 0, len = pins.features.length; i < len; i++) {
    var coords = pins.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1], coords[0]);
    heatmapData.push(latLng);
  }

  //insert heatmap layer
  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData,
    dissipating: false,
    radius: 5,
    map: map
  });
});