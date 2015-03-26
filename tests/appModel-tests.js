/* global it, describe, require */

var chai = require('chai'),
    expect = chai.expect,
    appModel = require('../server/public/js/models/appModel.js'),
    LocalStorage = require('node-localstorage').LocalStorage,
    localStorage;

describe('appModel tests', function() {

  beforeEach(function() {
    localStorage = new LocalStorage('./nodeLocalStorage');
  });

  afterEach(function() {
    localStorage._deleteLocation();
  });

   it('getClickRadiusMeters', function() {
    expect(appModel.getClickRadiusMeters()).to.equal(250000);
    expect(appModel.getClickRadiusMeters()).to.equal(
      appModel._clickRadius * 1000);
  });

  it('setClickRadiusMeters', function() {
    appModel.setClickRadius(99);

    expect(appModel._clickRadius).to.equal(99);
    expect(appModel.getClickRadius()).to.equal(99);
    expect(localStorage.getItem('clickRadius')).to.equal('99');
  });

});
