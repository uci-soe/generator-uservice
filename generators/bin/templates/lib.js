'use strict';


module.exports = {
  index: function(req, res, next){
    res.send(req.ip);
  }
};