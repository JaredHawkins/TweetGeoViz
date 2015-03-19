/*global google*/

var tgv = tgv || {};

// taken from http://youmightnotneedjquery.com/#ready
(function(Map, SearchBar, SlidePanel) {

  var domLoaded = function() {
    var pins = window.pins || {};

    var map = new tgv.Map({
      componentSelector: '#map-canvas'
    });

    var searchBar = new SearchBar({
      componentSelector: '#searchBar'
    });

    var slidePanel = new SlidePanel({
      componentSelector: '#slidePanel'
    });

    map.view.addMapControl(google.maps.ControlPosition.TOP_LEFT,
      searchBar.view.el);

    // if there was a search then let's render it
    map.addHeatMap(pins);
  };

  if (document.readyState != 'loading') {
    domLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', domLoaded);
  }

})(tgv.Map, tgv.SearchBar, tgv.SlidePanel);
