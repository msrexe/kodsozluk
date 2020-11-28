const blockVisitor = ['/action', '/action/add-post'];
const blockUsers = ['/login', '/register'];

module.exports = (req, res, next) => {
  if ( blockUsers.includes(req.url) && req.user ) {
    res.redirect('/');
  }
  if (blockVisitor.includes(req.url) && !req.user) {
    res.redirect('/login');
  }
  next();
}
