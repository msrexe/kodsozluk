const method = require('../methods');

exports.getUser = async (req, res) => {
  const queryUsername = req.params.username;
  const page = req.params.page || 1;

  method.findUser({ username: queryUsername}).then(async (user) => {
    if (user) {
      const pageCount = Math.ceil(await method.countEntry({user: user._id}) / 10);
      method.getEntries({user: user._id}, 10, page).then((entries) => {
        //checking if user see own profile
        var ownprofile = false;
        if (req.user && user.username == req.user.username) {
          ownprofile = true;
        }
        res.render('user', {
          title: user.username,
          username: user.username,
          entries: entries,
          ownprofile: ownprofile,
          pageCount: pageCount
        })
      });
    } else {
      res.render('user', {error: 'no-user'});
    }    
  });
} 