/*global google*/

// taken from http://youmightnotneedjquery.com/#ready
(function(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
})(function() {
  var pins = window.pins || {},
      mapCanvas = document.getElementById('map_canvas'),
      heatmapData = [];

  var mapOptions = {
    center: new google.maps.LatLng(44.5403, -78.5463),
    zoom: 1,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);

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