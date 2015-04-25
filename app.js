var express = require('express'),
    path    = require('path'),
    favicon = require('serve-favicon'),
    logger  = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),

    livereload = require('express-livereload'),

    routes = require('./routes/index'),
    users  = require('./routes/users'),
    charts = require('./routes/charts'),

    Config = require('./config/config'),  // config is a reserved word
    expressLess = require('express-less'),
    app = express();

livereload(app, config={
  'watchDir' : process.cwd()
});
console.log('Livereaload watchDir: ' + process.cwd());

console.log(Config);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(__dirname + '/public/stylesheets', expressLess(__dirname + '/public/stylesheets'));

app.use('/', routes);
app.use('/users', users);
app.use('/charts', charts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log("App started on localhost:3000!");

module.exports = app;
