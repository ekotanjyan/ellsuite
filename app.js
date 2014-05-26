
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , RedisStore = require('connect-redis')(express)
  , utility = require('./utils')
  , ECT = require('ect');

var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.html' });

var app = module.exports = express();

// Configuration
var env = process.env.NODE_ENV || 'development';
app.set('config',require('config')[env]);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.engine('html', ectRenderer.render);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.multipart());
  app.use(express.session({
    secret: "Somethinggg",
    store: new RedisStore({
        "url":app.get('config').redis
      })
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
utility.initRouters(['admin'], app);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.port, app.settings.env);
});
