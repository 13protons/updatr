const spawn = require('child_process').spawn;
const ls = spawn('npm', ['-v']);

module.exports = new Promise((resolve, reject)=>{
  ls.stdout.on('data', (data) => {
    resolve(`${data}`);
  });

  ls.stderr.on('data', (data) => {
    reject(Error(`${data}`));
  });
});
