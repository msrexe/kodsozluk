var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
  }
});
var options = {
  errorMessages: {
    MissingPasswordError: 'emty-password',
    AttemptTooSoonError: 'attempt-too-soon',
    TooManyAttemptsError: 'attempt-too-many',
    NoSaltValueStoredError: 'Authentication not possible. No salt value stored',
    IncorrectPasswordError: 'wrong-creds',
    IncorrectUsernameError: 'wrong-creds',
    MissingUsernameError: 'empty-username',
    UserExistsError: 'user-exist'
  }
};

Account.plugin(passportLocalMongoose,options);

var passAccount;

if (mongoose.models.Account) {
  passAccount = mongoose.model('Account');
} else {
  passAccount = mongoose.model('Account', Account);
}

module.exports = passAccount;