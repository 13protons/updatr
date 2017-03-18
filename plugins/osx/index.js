const semver = require('semver');
const os = require('os');
const darwinIndex = require('./mappings.json');

module.exports = new Promise((resolve, reject) => {
  let platform = os.platform();
  if (platform !== 'darwin') {
    reject(Error('platform is' + platform));
    return;
  }
  let osxVersion = getOsxVersion(os.release(), darwinIndex);

  if (osxVersion) {
    resolve(osxVersion);
  } else {
    reject(Error('No suitable version found'));
  }
});


function getOsxVersion(version, index) {
  let tuple = index.find((item) => {
    return semver.satisfies(version, item[0]);
  });

  if (tuple) {
    return tuple[1];
  }
  return undefined;
}
