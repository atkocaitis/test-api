'use strict';

var utils = require('../../utils/utils.js'),
    frisby = utils.getFrisby(),
    method = utils.getName(__dirname);

describe('Testing webservice ' + method, function() {
  it('should get correct data', function(done) {
    frisby
      .post(utils.getUrl() + "/CreateAccount/" + method, 'EmailAddress=test%40test.lt')
      .expect('status', 200)
      .expect('json', utils.getResponse(method))
      .then(function (json) {
        utils.validateSchema(json, utils.getSchema(method));
      })
      .done(done);
  });
});