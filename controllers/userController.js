const Account = require('../models/Account');
const Entry = require('../models/Entry');

exports.getUser = (req, res) => {
  const queryUsername = req.params.username;

  Account.findOne({ username: queryUsername}, (err, user) => {
    if (err) {
      console.log(err);
      return res.render('user', {error: err});
    } 
    if (user) {
      Entry.find({user: user._id}).sort('-date').limit(10).exec((err, entries) => {
        if (err) {
          return res.redirect(req.get('referer'))
        }
        entries = entries.map((entry) => entry.toJSON());
        res.render('user', {
          username: user.username,
          entries: entries
        })
      });
      // res.render('user', {
      //   username: user.username
      // });
    } else {
      res.locals.error = {
        type: 'no-user',
        message: 'User Not Found',
      };
      res.render('user');
    }
  });

} 