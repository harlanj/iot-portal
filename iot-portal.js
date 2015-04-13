var express = require('express');
var app     = express();

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.locals.title = 'IoT-Portal | Front-end to IoT-Home';

// Render Index Page
app.get('/', function(req, res) {
  res.render('index');
});

app.listen(process.env.PORT || 4343, function(){
  console.log('IoT Portal listening on port %d', process.env.PORT || 4343);
});
