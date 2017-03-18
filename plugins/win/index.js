const os = require('os');

module.exports = new Promise((resolve, reject) => {
  let platform = os.platform();
  if (platform !== 'win32') {
    reject(Error('platform is' + platform));
    return;
  }

  resolve(os.release());
});
