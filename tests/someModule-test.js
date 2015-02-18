/* global it, describe */

var chai = require('chai');
    expect = chai.expect,
    someModule = require('../libs/someModule.js');

describe('testing suite', function() {

  it('dummy test 1', function() {
    var result = someModule.sayHello();
    expect(result).to.be.a('string');
    expect(result).to.equal('Hello');
  });

});