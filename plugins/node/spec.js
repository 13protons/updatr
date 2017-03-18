const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
const nodeVersion = require('./index.js');

describe('node', ()=>{
  it('should return the current node version', (done)=>{
    nodeVersion.should.eventually.equal(process.version)
      .and.notify(done);
  });
});
