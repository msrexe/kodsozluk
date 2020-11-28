var passport = require('passport');
const Account = require('../models/Account');

exports.getLogin = (req, res) => {
  res.render('login');
} 

exports.postLogin = (req, res, next) => {
  passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login',
  })(req, res, next);
};

exports.getRegister = (req, res) => {
  res.render('register')
} 

exports.postRegister = (req, res) => {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      console.log(err);
      return res.render('register', { user : account });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
});
}