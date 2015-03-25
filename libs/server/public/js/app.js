var tgv = tgv || {};

(function(TweetCollection, Map, SearchBar, SlidePanel, TweetsPopup) {

  var domLoaded = function() {
    var pins = window.pins || {};

    var tweetCollection = new TweetCollection(pins);

    var map = new tgv.Map({
      componentSelector: '#map-canvas',
      tweetCollection: tweetCollection
    });

    var searchBar = new SearchBar({
      componentSelector: '#searchBar'
    });

    var slidePanel = new SlidePanel({
      componentSelector: '#slidePanel',
      contentSelector: '.site-wrapper'
    });

    var tweetsPopup = new TweetsPopup({
      componentSelector: '#tweetsPopup'
    });

    map.view.addMapControl(google.maps.ControlPosition.TOP_LEFT,
      searchBar.view.el);

    // if there was a search then let's render it
    //var TweetCollection = new TweetCollection(pins);

    //map.addHeatMap(pins);
  };

  if (document.readyState != 'loading') {
    domLoaded();
  } else {
    document.addEventListener('DOMContentLoaded', domLoaded);
  }

})(tgv.TweetCollection, tgv.Map, tgv.SearchBar, tgv.SlidePanel, tgv.TweetsPopup);
