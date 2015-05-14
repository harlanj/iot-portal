var lightOne = $('.light-one');
var lightTwo = $('.light-two');

var updateStatus = function(light, results) {
  light = light === 1 ? lightOne : lightTwo;

  switch (results.type) {
    case ('setHue'):
      status = !results.success ? results.error.message : 'Light hue: ' + results.hue;
      break;
    case ('setState'):
      status = !results.success ? results.error.message : 'Light status: ' + results.status;
      break;
    case ('getState'):
      status = !results.success ? results.error.message : 'Light status: ' + (results.status ? 'on' : 'off');
      break;
  }

  var date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  status = '<p>' + date + ' ' + status + '</p>';
  light.after(status);
};
