var rootUrl = 'http://iothome.mod.bz';

var app = this;
var running = false;


if (!('webkitSpeechRecognition' in window)) {
  $('.supported').hide();
  updateError('Web speech API is not supported in this browser');
} else {
  $('.mic-animate').hide();
  app.recognition = new webkitSpeechRecognition(); // Speech recognition init
  // app.recognition.continuous = true;               // continuously listen to speech
  // app.recognition.interimResults = true;
  app.recognition.lang = 'en-US';                  // set languages supported
}

app.recognition.onerror = function(err) {
  app.updateError(err);
};

app.recognition.onstart = function() {
  running = true;
  $('.fa-microphone').hide();
  $('.mic-animate').show();
};

app.recognition.onend = function() {
  running = false;
  $('.mic-animate').hide();
  $('.fa-microphone').show();
};

app.recognition.onresult = function(event) {
 for (var i = event.resultIndex; i < event.results.length; i++) {
  if (event.results[i].isFinal) {
    $('.speech-results').append(event.results[i][0].transcript +
        ' (Confidence: ' + event.results[i][0].confidence + ') <br>');
  } else {
    $('.speech-results').append(event.results[i][0].transcript);
  }

  checkCommand(event.results[i][0].transcript);
  }
};

app.updateError = function(err) {
  var message = !err.message && err.error === 'not-allowed' ? 'Permission to use microphone denied' : err.message;
  $('.lead').text(message);
  $('#errorModal').foundation('reveal', 'open');
};

$('.fa-microphone').click(function() {
  $('.speech-results').text('');
  app.recognition.start();
});

$('.mic-animate').click(function() {
  app.recognition.stop();
});

var checkCommand = function(command) {
  switch(command) {
    case ' set the mood':
    case 'set the mood':
      console.log('***turning on bedroom light');
      setLight(1, 'on', function(err, res) {
        if (err) console.log('error', err);
        if (res) console.log('success', res);
      });
      break;
    case ' turn on bedroom light':
    case 'turn on bedroom light':
      console.log('***turning on bedroom light');
      setLight(1, 'on', function(err, res) {
        if (err) console.log('error', err);
        if (res) console.log('success', res);
      });
      break;
    case ' turn off bedroom light':
    case 'turn off bedroom light':
      console.log('***turning off bedroom light');
      setLight(1, 'off', function(err, res) {
        if (err) console.log('error', err);
        if (res) console.log('success', res);
      });
      break;
    case ' turn on bedroom lamp':
    case 'turn on bedroom lamp':
      console.log('***turning on bedroom lamp');
      setLight(2, 'on', function(err, res) {
        if (err) console.log('error', err);
        if (res) console.log('success', res);
      });
      break;
    case ' turn off bedroom lamp':
    case 'turn off bedroom lamp':
      console.log('***turning off bedroom lamp');
      setLight(2, 'off', function(err, res) {
        if (err) console.log('error', err);
        if (res) console.log('success', res);
      });
      break;
    default:
      console.log('hit default case');
      break;
  }
};

var setLight = function(light, status, callback) {
  $.ajax({
    url: rootUrl + '/hue/light/' + light + '/' + status,
    type: 'GET',
    success: function (data) {
      updateStatus(light, {status: status, success: true});
      callback(null, data);
    },
    error: function(data) {
      updateStatus(light, {status: status, success: false, error: data.responseJSON.message});
      updateError(data.responseJSON);
      callback(data.responseJSON);
    }
  });
};

var getLight = function(light, callback) {
  $.ajax({
    url: rootUrl + '/hue/light/' + light,
    type: 'GET',
    success: function (data) {
      updateStatus(light, {status: status, success: true});
      callback(null, data);
    },
    error: function(data) {
      updateStatus(light, {status: status, success: false, error: data.responseJSON.message});
      updateError(data.responseJSON);
      callback(data.responseJSON);
    }
  });
};

function start() {
  console.log('get light 1 status');
  getLight(1, function(err, res) {
    if (err) console.log('err', err);
    if (res) console.log('res', res);
  });

  console.log('get light 2 status');
  getLight(2, function(err, res) {
    if (err) console.log('err', err);
    if (res) console.log('res', res);
  });
}

start();
