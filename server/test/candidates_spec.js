var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var supertest = require('supertest');
var request = require('request');
var sinon = require('sinon');

var mongoose = require('mongoose');
var User = require('../app/models/user');
var UserModel = mongoose.model('User');
var server = require('../server');



describe('User routes', function() {  
  before(function(done){
    sinon
      .stub(request, 'get')
      .yields(null, null, JSON.stringify({login: "bulkan"}));
    done();
  });

  it('should get ALL candidates (non-admin user) on /queryAllCandidates GET', function(done) {
    chai.request(server)
      .get('/api/queryAllCandidates')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
  
  // it('#findUnicorns', function(done) {

  //   // test setup
  //   var unicorns = [ 'unicorn1', 'unicorn2' ];
  //   var query = { world: '1' };

  //   // mocking MongoDB
  //   sinon.stub(UserModel, 'findUnicorns').yields(null, unicorns);

  //   // calling the test case
  //   User.colorizeUnicorns(query, function(err, coloredUnicorns) {

  //     // asserting
  //     expect(err).to.be.null;
  //     expect(coloredUnicorns).to.eql(['unicorn1-pink', 'unicorn2-purple']);

  //     // as our test is asynchronous, we have to tell mocha that it is finished
  //     done();
  //   });
  // });

  it('should add a SINGLE candidate (non-admin user) on /addCandidate POST', function(done) {
    chai.request(server)
      .post('/api/addCandidate')
      .send({
        'firstName': 'johnbang',
        'lastName': 'johnbang',
        'email': 'johnbang',
        'admin': 'N'
      })
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('firstName');
        expect(res.body.firstName).to.equal('johnbang');
        // expect(res.body).to.have.property('lastName');
        // expect(res.body).to.have.property('email');
        // expect(res.body).to.have.property('admin');
        // expect(res.body).to.have.property('currentExam');
        expect(res.body.currentExam).to.be.null;
        done();
      });
  });
  
  after(function(done){
    request.get.restore();
    done();
  });



});