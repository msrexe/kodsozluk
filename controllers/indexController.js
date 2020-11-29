const method = require('../methods');

exports.getHome = async (req, res) => {
  const page = req.params.page || 1;
  const pageCount = Math.ceil(await method.countEntry() / 10);
  method.getEntries({}, 10, page).then((entries) => {
    res.render('index', {
      title: 'KodSozluk', 
      user: req.user,
      entries: entries,
      pageCount: pageCount
    });
  });
};

exports.getTerm = async (req, res) => {
  const page = req.params.page || 1;
  const pageCount = Math.ceil(await method.countEntry({title: req.params.title}) / 10);
  method.getEntries({title: req.params.title}, 10, page).then((entries) => {
    res.render('term', {
      title: req.params.title,
      entries: entries,
      pageCount: pageCount
    })
  });
};

exports.postTerm = (req, res) => {
  if (req.user) {    
    method.saveEntry(
      req.params.title, 
      req.body.body, 
      req.user._id
    );
  }
  return res.redirect(req.get('referer'));
}

