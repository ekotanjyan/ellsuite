exports.init = function(type){
  var _m = "Right is not defined";
  return (({
    "guest":function(req, res, next){
        if(req.session.uid){
            res.redirect(302, '/search');
        }else{
            return next();
        }
    },
    "admin":function(req,res,next){
      if(req.session.user && req.session.user.is_admin*1){
        next();
      }else{
        res.send(404);
      }
    }
  })[type]) ||  (console.error(_m),_m);
}