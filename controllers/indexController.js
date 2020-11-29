const Entry = require('../models/Entry');
const Account = require('../models/Account');

const findUser = (_id) => {
  return new Promise((resolve) => { 
    Account.findOne({ _id: _id}).then((user) => {
      resolve(user);
    }).catch(() => {
      resolve(false);
    })
  });
}

const getEntries = async (cond = {}, limit = 10) => {
  let entries = await Entry.find(cond).sort('-date').limit(limit).exec();
  entries = await Promise.all(entries.map(async (entry) => {
    const user = await findUser(entry.user);
    entry = entry.toJSON();
    entry.user = user.toJSON();
    return entry;
  }));
  return entries;
}



exports.getHome = async (req, res) => {
  getEntries().then((entries) => {
    res.render('index', {
      title: 'Express', 
      user: req.user,
      entries: entries
    });
  });
};

exports.getTerm = (req, res) => {
  getEntries({title: req.params.title}).then((entries) => {
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

