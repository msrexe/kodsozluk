//add langs here
var tr = require('./langs/tr.json')

module.exports = (req, res, next) => {
  req.app.locals.lang = tr; 
  next();
}