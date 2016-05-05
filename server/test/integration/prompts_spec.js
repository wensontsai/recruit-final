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

var PromptTest = require('../../app/models/prompt');

describe ('Prompt routes', function() {  
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

  it ('should get ALL prompts (shuffled, for examinations) on /queryAllPrompts GET', function(done) {
    chai.request(server)
      .get('/api/queryAllPrompts')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });
  it ('should add a SINGLE prompt on /addPrompt POST', function(done) {
    chai.request(server)
      .post('/api/addPrompt')
      .send({
        'question': 'Test Question 2.'
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('question');
        expect(res.body.question).to.equal('Test Question 2.');
        done();
      });
  });
  it ('should get ALL prompts (for Admin dash) on /queryAllPromptsList GET', function(done) {
    chai.request(server)
      .get('/api/queryAllPromptsList')
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

  // it ('should edit a SINGLE prompt on /editPrompt POST', function(done) {
  //   chai.request(server)
  //     .post('/api/editPrompt')
  //     .send({
  //       'question': 'Write a factorial function using recursion.'
  //     })
  //     .end(function(err, res){
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res.body).to.be.a('object');
  //       expect(res.body).to.have.property('question');
  //       expect(res.body.question).to.equal('Write a factorial function using recursion.');
  //       done();
  //     });
  // });
  // it ('should delete a SINGLE prompt on /deletePrompt POST', function(done) {
  //   chai.request(server)
  //     .post('/api/deletePrompt')
  //     .send({
  //       'question': 'Write a factorial function using recursion.'
  //     })
  //     .end(function(err, res){
  //       expect(err).to.be.null;
  //       expect(res).to.have.status(200);
  //       expect(res).to.be.json;
  //       expect(res.body).to.be.a('object');
  //       expect(res.body).to.have.property('question');
  //       expect(res.body.question).to.equal('Write a factorial function using recursion.');
  //       done();
  //     });
  // });

  afterEach(function (done) {
    mongoose.disconnect();
    return done();
  });

});