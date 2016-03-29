var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;

var server = require('../server');

chai.use(chaiHttp);


describe('Prompt routes', function() {  

  it('should get All Prompts on /queryAllPrompts GET', function(done) {
    chai.request(server)
      .get('/api/queryAllPrompts')
      .end(function(err, res){
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        done();
      });
  });

});