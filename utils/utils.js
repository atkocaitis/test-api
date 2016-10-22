'use strict';

var frisby = require('frisby'),
    config = require('./config.js'),
    Validator = require('jsonschema').Validator,
    assert = require('assert'),
    Utils = {};

/**
* Function to get Frisbyjs instance
* @return {object} Return Frisbyjs instance
*/
Utils.getFrisby = function() {
  return frisby;
};

/**
* Function to get method name from directory path
* @param  {string} dir Directory path to method spec file
* @return {string} Return method name
*/
Utils.getName = function(dir) {
  return String(dir.split('/').splice(-1));
};

/**
* Function to get test base url
* @return {string} Return test url to with entryPoint
*/
Utils.getUrl = function() {
  return (process.env.npm_config_baseUrl || config.baseUrl);
};

/**
* Function to get response json file
* @param  {object} method Method name
* @return {object} Return Response JSON
*/
Utils.getResponse = function(method) {
  this.json = require('../webservice/' + method + '/json/' + method + '.json');

  return this.json.response;
};

/**
* Function to get response JSON Schema json file
* @param  {object} method Method name
* @return {object} Return JSON Schema
*/
Utils.getSchema = function(method) {
  this.json = require('../webservice/' + method + '/schema/' + method + '.json');

  return this.json;
};

/**
* Function to validate response with JSON Schema
* @param  {object} response Response JSON
* @param  {object} schema Schema JSON
*/
Utils.validateSchema = function(response, schema) {
  var v = new Validator(),
      result = v.validate(response, schema);

  assert(result.errors.length == 0, result);
};

module.exports = Utils;