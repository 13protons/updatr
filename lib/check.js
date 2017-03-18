import $http from 'request-promise';
import validator from './validator.js';

export default function(config) {

  var options = {
    uri: config.updateUrl,
    json: true // Automatically parses the JSON string in the response
  };

  if (config.headers) {
    options.header = config.headers;
  }

  $http(options)
    .then(validator)
    .then(function(validJson){
      // do something
      return {
        updateAvailable: true,
        packageUrl: 'some://url'
      }
    })
    .catch(function (err) {
        if (err) {
          console.error(err);
        }
    });
}
