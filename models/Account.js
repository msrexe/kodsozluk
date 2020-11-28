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

Account.plugin(passportLocalMongoose);

var passAccount;

if (mongoose.models.Account) {
    passAccount = mongoose.model('Account');
} else {
    passAccount = mongoose.model('Account', Account);
}

module.exports = passAccount;