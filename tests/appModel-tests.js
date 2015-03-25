/* global it, describe, require */

var chai = require('chai'),
    expect = chai.expect,
    appModel = require('../libs/server/public/js/models/appModel.js');

describe('appModel tests', function() {

  it('getClickRadiusMeters', function() {
    expect(appModel.getClickRadiusMeters()).to.equal(250000);
    expect(appModel.getClickRadiusMeters()).to.equal(
      appModel.clickRadius * 1000);
  });

});
