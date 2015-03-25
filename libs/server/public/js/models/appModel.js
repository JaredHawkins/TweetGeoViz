var tgv = tgv || {};

(function() {
  var AppModel = function() {
    this.getClickRadiusMeters = this.getClickRadiusMeters.bind(this);
  };

  AppModel.prototype = {
    getClickRadiusMeters: function AppModel_getClickRadiusMeters() {
      var km = 1000;

      return this.clickRadius * km;
    },

    showingSidePanel: false,
    showingTweetsPopup: false,
    clickRadius: 250,
    searchQuery: null
  };

  tgv.appModel = new AppModel();
})();