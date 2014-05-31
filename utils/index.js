var auth = require('./auth');
exports.initRouters = function(list,app){
    list.forEach(function(_E){
        var _R = require('../routes/'+_E);
        var _prefix = _R.prefix || '';
        _R.forEach(function(_r){
            if(Array.isArray(_r[2])){
              app[_r[0]].apply(app,([_prefix+_r[1]].concat(_r[2].map(function(_z){return auth.init(_z)}), _r[3])));
            }else{
              app[_r[0]](_prefix+_r[1],_r[2]);
            }
            
        });
    });
}
exports.initTitle = function(req, res, next){
    var _render = res.render.bind(res);
    res.render = function renderCustomModificaion(name, options, fn){
        if(!options.customTitle){
            options.pTitle = (options.title || '') + (options.title?" - ":"") + req.app.get('title');
        }else{
            options.pTitle = options.title;
        }
        _render(name, options ,fn);
    }
    next();
}