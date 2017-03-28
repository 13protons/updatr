import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import semver from 'semver';
import Q from 'q';
/**
  Find the most recent release that is compatiable with the current system
  @param {array} releases obtained from the udpate server
*/
module.exports = function findCompatiableVersion(releases) {
  let checking = releases.map(checkVersion);
  console.log('checking', checking);
  return Q.allSettled(checking)
    .then(function(results) {
      return _.filter(results, ['state', 'fulfilled']);
    });
};

/**
  Check to see if a release is compatiable with the current system environment
  @param {object} release A description of the releases
  @return {Promise} Which resolves if compatiable, rejects if not
*/
function checkVersion(release) {
  // figure out if system is compatiable
  // return most recent compatiable version
  let any = _(release).get('requires.any');
  let all = _(release).get('requires.all');

  let checkingAny = _.map(any, checkDependency);
  let checkingAll = _.map(all, checkDependency);

  console.log('any', checkingAny, 'all', checkingAll);

  return Q.any(checkingAny)
    .then((anyResults)=>{
      console.log('hasAny results', JSON.stringify(anyResults));
      if (anyResults.length > 0) {
        return Q.all(checkingAll);
      } else {
        return Q.reject('No matching dependencies found in "any"');
      }
    })
    .then((allResults)=>{
      if (_.some(allResults, _.isEmpty)) {
        return Q.reject('Missing some require dependencies');
      }
      return release;
    })
    .catch((err) => {
      console.error(err);
      throw Error(err);
    });
}

/**
  Check a version against an existing plugin
  @param {string} version Valid semver version description
  @param {string} plugin Plugin name to test against version
  @return {Promise} Which resolves if compatiable, rejects if not
*/
function checkDependency(version, plugin) {
  let pluginPath = path.resolve(__dirname, '../plugins', plugin, 'index.js');
  if (hasPlugin(pluginPath)) {
    return require(pluginPath).then((installed) => {
      if (semver.satisfies(installed, version)) {
        return [plugin, installed];
      }

      let msg = plugin + ' v' + installed;
      msg += ' is not compatiable with the required version ('+ version +')';
      return new Error(msg);
    });
  }
  return new Error('No plugin found for ' + plugin);
}

/**
  Check for the existence of a plugin
  @param {string} pluginPath of the existing plugin
  @return {Boolean} whether or not the plugin exists
*/
function hasPlugin(pluginPath) {
  return fs.existsSync(pluginPath);
}

// var release = {
//     "product_id": "1234",
//     "version": "1.0",
//     "released": "2017-03-17T00:00:00+00:00",
//     "url": "",
//     "requires": {
//       "any": {
//         "osx": ">=10.7 <11",
//         "win": ">7"
//       },
//       "all": {
//         "npm": "=3",
//         "node": ">4 <7"
//       }
//     }
//   }
