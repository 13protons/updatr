const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const mock = require('mock-require');

describe('winTest', ()=>{
  describe('happy path', () => {
    let winTest;

    before(()=>{
      mock('os', {
        platform: () => {
          return 'win32';
        },
        release: () => {
          return '10.0.0';
        }
      });
      winTest = require('./index.js');
    });

    after(()=>{
      mock.stopAll();
    });

    it('should match os darmin 16 to osx 10.12', (done) => {
      winTest.should.be.fulfilled.and.notify(done);
    });
  });

  describe('sad path', () => {
    let winTest;

    before(()=>{
      mock('os', {
        platform: () => {
          return 'darwin';
        },
        release: () => {
          return '10.0.0';
        }
      });
      mock.reRequire('./index.js');
      winTest = require('./index.js');
    });

    after(()=>{
      mock.stopAll();
    });

    it('should not match os darmin 18', (done) => {
      winTest.should.be.rejectedWith(Error).and.notify(done);
    });
  });
});
