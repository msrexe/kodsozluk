var passport = require('passport');
const Account = require('../models/Account');
const validation = require('../validation');

exports.getLogin = (req, res) => {
  res.render('login', {title: 'Login'});
} 

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { 
      return next(err);
    }
    if (!user) { 
      return res.render('login', {error: true}); 
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err); 
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  res.render('register', {title: 'Register'})
} 

exports.postRegister = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const validErr = validation.register(username, password);
  if (validErr.length > 0) {
    return res.render('register', {error: validErr})
  }
  Account.register(new Account({ username : username }), password, (err) => {
    if (err) {
      return res.render('register', { error : [err.message] });
    }
    passport.authenticate('local')(req, res, () => {
        res.redirect('/');
    });
  });
}

exports.getLogout = (req, res) => {
  req.logout();
  return res.redirect('/');
}