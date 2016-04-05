var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

var supertest = require('supertest');
var request = require('request');

var mongoose = require('mongoose');
var sinon = require('sinon');

var UserTest = require('../app/models/user');
// var UserModelTest = mongoose.model('User');

var UserRoutesTest = require('../app/routes/userRoutes');

var server = require('../server');

// var myStub = sinon.stub(UserModel, 'addUser');


describe ('User routes', function() {  
  // before(function(done){
    // sinon
    //   .stub(request, 'get')
    //   .yields(null, null, JSON.stringify({login: "bulkan"}));
    // done();

    // console.log(mongoose.Model);
  // });

  // beforeEach (function(done) {  
  //     //add some test data    
  //     customer.register('test@test.com', 'password', 'password', function(doc){      
  //       currentCustomer = doc;      
  //       done();    
  //     });  
  //   });  

  afterEach (function(done) {    

    //delete all the customer records    
    UserTest.remove({}, function() {     
      done();    
    }); 
  }); 

  it ('should get ALL candidates (non-admin user) on /queryAllCandidates GET', function(done) {
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

  it ('should add a SINGLE candidate (non-admin user) on /addCandidate POST', function(done) {
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
        expect(res.body.lastName).to.equal('johnbang');
        expect(res.body.email).to.equal('johnbang');
        expect(res.body.currentExam).to.be.null;

        done();
      });
  });
  
  // after(function(done){
  //   request.get.restore();
  //   done();
  // });



});