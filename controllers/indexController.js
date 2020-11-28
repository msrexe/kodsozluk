const Entry = require('../models/Entry');
const Account = require('../models/Account');

const findUserName = (_id) => {
  return new Promise((resolve) => { 
    Account.findOne({ _id: _id}).then((user) => {
      resolve({user});
    }).catch((err) => {
      console.log(err);
      resolve(false);
    })
  });
}


exports.getHome = async (req, res) => {
  Entry.find().sort('-date').limit(10).exec(async (err, entries) => {
    if (err) {
      return res.redirect(req.get('referer'))
    }
    entries = await Promise.all(entries.map(async (entry) => {
      const user = await findUserName(entry.user);
      console.log(typeof user);
      entry['user'] = {username:user};
      console.log(entry);
      return entry.toJSON;
    }));

    res.render('index', {
      title: 'Express', 
      user: req.user,
      entries: entries
    });
  });
};

exports.getTerm = (req, res) => {
  Entry.find({title: req.params.title}).sort('-date').limit(10).exec((err, entries) => {
    if (err) {
      return res.redirect(req.get('referer'))
    }
    entries = entries.map((entry) => {
      entry.user = findUser(entry.user);
      return entry.toJSON();
    });
    res.render('term', {
      title: req.params.title,
      entries: entries
    })
  });
};

exports.postTerm = (req, res) => {
  if (req.user) {    
    const entry = new Entry({
      title: req.params.title,
      body: req.body.body,
      user: req.user._id
    });
    entry.save((err) => {
      if (err) {
        console.error(err);
      }
    });
  }
  res.redirect(req.get('referer'));
}

