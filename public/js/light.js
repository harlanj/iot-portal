var lightOne = $('.light-one');
var lightTwo = $('.light-two');

var updateStatus = function(light, results) {
  light = light === 1 ? lightOne : lightTwo;
  var date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
  var status = !results.success ? results.error : 'Light status: ' + results.status;
  status = '<p>' + date + ' ' + status + '</p>';
  light.after(status);
};


// $("#mydiv div:first-child").after(newDiv);