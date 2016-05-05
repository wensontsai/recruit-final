var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
var supertest = require('supertest');
var request = require('request');
var mongoose = require('mongoose');
var sinon = require('sinon');
var api = supertest('http://localhost:3121');
var config = require ('../../config');
var server = require('../../app/server');

var ExaminationTest = require('../../app/models/examination');

describe ('Examination routes', function() {  
  beforeEach(function (done) {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(config.db.test, function (err) {
        if (err) {
          throw err;
        }
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  



  afterEach(function (done) {
    mongoose.disconnect();
    return done();
  });

});