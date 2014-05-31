
/**
 * Module dependencies.
 */

var express   = require('express')
  , routes    = require('./routes')
  , path      = require('path') 
  , RedisStore= require('connect-redis')(express)
  , utility   = require('./utils')
  , ECT     = require('ect');

var ectRenderer = ECT({ watch: true, root: __dirname + '/views', ext : '.html' });

var app = module.exports = express();

// Configuration
var env = process.env.NODE_ENV || 'development';
app.set('config', require(path.resolve('config'))[env]);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.set('title',"Ellsute");
  app.engine('html', ectRenderer.render);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.multipart());
  app.use(express.session({
    secret: "aGVsbG9hc2ZzYWZmYXNm",
    store: new RedisStore({
        "url":app.get('config').redis
      })
  }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  app.use(express.logger('dev'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
  app.use(express.logger('prod'));
});

// Routes
utility.initRouters(['admin'], app);

app.listen(app.get('port'), function(){
  console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});
