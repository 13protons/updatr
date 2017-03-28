const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const sampleResponse = require('./response.json');
const worksWith = require('../works_with.js');

describe('works_with', ()=>{
  it('should return a promise', ()=>{
    let processed = worksWith(sampleResponse);
    processed.then.should.be.ok;
  });
  it('should only work with one supplied version', (done)=>{
    let processed = worksWith(sampleResponse);
    processed.then(function(responses) {
      responses.length.should.be.below(sampleResponse.length);
      done();
    });
  });
});
