exports.init = function(type){
  var _m = "Right is not defined";
  return (({
    "guest":function(req, res, next){
        if(req.session && req.session.user){
            res.redirect(302, '/admin/');
        }else{
            return next();
        }
    },
    "admin":function(req,res,next){
      if(req.session && req.session.user && req.session.user.isAdmin*1){
        next();
      }else{
        res.redirect(302, '/admin/login');
      }
    }
  })[type]) ||  (console.error(_m),_m);
}