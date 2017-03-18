const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();
const npmVersion = require('./index.js');

describe('npm', ()=>{
  it('should return the current npm version', (done)=>{
    npmVersion.should.be.fulfilled.and.notify(done);
  });
});
