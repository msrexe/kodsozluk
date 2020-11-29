const Account = require('../models/Account');
const Entry = require('../models/Entry');

exports.getUser = (req, res) => {
  const queryUsername = req.params.username;

  Account.findOne({ username: queryUsername}, (err, user) => {
    if (err) {
      return res.render('user', {error: err});
    } 
    if (user) {
      Entry.find({user: user._id}).sort('-date').limit(10).exec((err, entries) => {
        if (err) {
          return res.redirect(req.get('referer'))
        }
        entries = entries.map((entry) => entry.toJSON());
        var ownprofile = false;
        if (req.user && user.username == req.user.username) {
          ownprofile = true;
        }
        res.render('user', {
          title: user.username,
          username: user.username,
          entries: entries,
          ownprofile: ownprofile
        })
      });
    } else {
      res.render('user', {error: 'no-user'});
    }
  });

} 