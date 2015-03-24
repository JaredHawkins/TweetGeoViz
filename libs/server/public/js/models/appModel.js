var tgv = tgv || {};

(function() {
  var AppModel = function() {
    this.getClickRadiusMeters = this.getClickRadiusMeters.bind(this);
  };

  AppModel.prototype = {
    getClickRadiusMeters: function AppModel_getClickRadiusMeters() {
      var km = 1000;

      return this._clickRadius * km;
    },

    showingSidePanel: false,
    _clickRadius: 250
  };

  tgv.appModel = new AppModel();
})();