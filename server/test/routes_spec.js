import chai from 'chai';
var chaiHttp = require('chai-http');
import server from '../server.js';
var should = chai.should();
chai.use(chaiHttp);

describe('Prompt routes', function() {  

  it('should queryAllPrompts on /queryAllPrompts GET', function(done) {
    chai.request(server)
      .get('/api/queryAllPrompts')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

});