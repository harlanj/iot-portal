var rootUrl = 'http://iothome.mod.bz';
// var rootUrl = 'http://localhost:8015';

var getLight = function(light, callback) {
  $.ajax({
    url: rootUrl + '/hue/light/' + light,
    type: 'GET',
    success: function (data) {
      callback(null, data);
    },
    error: function(data) {
      callback(data.responseJSON);
    }
  });
};

var setLight = function(light, status, callback) {
  $.ajax({
    url: rootUrl + '/hue/light/' + light + '/' + status,
    type: 'GET',
    success: function (data) {
      callback(null, data);
    },
    error: function(data) {
      callback(data.responseJSON);
    }
  });
};

var setHue = function(light, hue, callback) {
  console.log(arguments);
  $.ajax({
    url: rootUrl + '/hue/light/' + light + '/set',
    type: 'PUT',
    data: { brightness: hue },
    success: function(data) {
      callback(null, data);
    },
    error: function(data) {
      callback(data.responseJSON);
    }
  });
};