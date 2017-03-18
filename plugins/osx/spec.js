const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
chai.should();

const mock = require('mock-require');

describe('osxTest', ()=>{
  describe('happy path', () => {
    let osxTest;

    before(()=>{
      mock('os', {
        platform: () => {
          return 'darwin';
        },
        release: () => {
          return '16.0.0';
        }
      });
      osxTest = require('./index.js');
    });

    after(()=>{
      mock.stopAll();
    });

    it('should match os darmin 16 to osx 10.12', (done) => {
      osxTest.should.eventually.equal('10.12.0').and.notify(done);
    });
  });

  describe('sad path', () => {
    let osxTest;

    before(()=>{
      mock('os', {
        platform: () => {
          return 'darwin';
        },
        release: () => {
          return '18.0.0';
        }
      });
      mock.reRequire('./index.js');
      osxTest = require('./index.js');
    });

    after(()=>{
      mock.stopAll();
    });

    it('should not match os darmin 18', (done) => {
      osxTest.should.be.rejectedWith(Error).and.notify(done);
    });
  });
});
