exports.register = (username, password) => {
  var err = [];
  if (username.length < 4) {
    err.push('short-username');
  }
  //checking username for speacial characters
  if(!username.match(/^[0-9a-zA-Z]+$/)) {
    err.push('special-character-username');
  }
  if (password.length < 8) {
    err.push('short-password');
  }
  return err;
}