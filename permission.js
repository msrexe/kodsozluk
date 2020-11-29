//control user permission on routes
const blockVisitor = ['/logout'];
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
