import $http from 'request-promise';
import validator from './validator.js';
import worksWith from './works_with.js';

/**
  Poll the update server for a list of recent releases
  @param {object} config Update server configuration params
  @return {object} The most recent compatiable, update or undefined
*/
export default function(config) {
  const options = {
    uri: config.updateUrl,
    json: true // Automatically parses the JSON string in the response
  };

  if (config.headers) {
    options.header = config.headers;
  }

  return $http(options)
    .then(validator)
    .then(worksWith)
    .then(function(latestCompatiable) {
      return {
        updateAvailable: true,
        packageUrl: 'some://url'
      };
    })
    .catch(function(err) {
      if (err) {
        console.error(err);
      }
      return Error(err);
    });
}
