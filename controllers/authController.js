var passport = require('passport');
var Account = require('../models/account');

exports.getLogin = (req, res) => {
  res.render('login');
} 

exports.postLogin = passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true 
});

exports.getRegister = (req, res) => {
  res.render('register')
} 

exports.postRegister = (req, res) => {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
        return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
    });
});
}