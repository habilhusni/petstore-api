const express     = require('express'),
      cors        = require('cors'),
      bodyParser  = require('body-parser'),
      logger      = require('morgan'),
      mongoose    = require('mongoose'),
      path        = require('path'),
      index       = require('./routes/index'),
      app         = express();

// mongodb connection
mongoose.connect('mongodb://localhost/pet');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// some middlewares
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// main route
app.use('/', index); 

// connecting to PORT
app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


module.exports    = app;