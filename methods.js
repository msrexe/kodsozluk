const Entry = require('./models/Entry');
const Account = require('./models/Account');

const countEntry = async (cond = {}) => {
  return await Entry.count(cond).exec();
}

const findUser = (cond) => {
  return new Promise((resolve) => { 
    Account.findOne(cond).then((user) => {
      resolve(user);
    }).catch(() => {
      resolve(false);
    })
  });
}

// const registerUser = ()

/**
 * @param {object} cond 
 * @param {int} limit the maximum number of documents the query will return default=10
 * @param {int} page the number of documents to skip default = 1 last = (page-1)*limit
 * @param {boolean} getUser default = true
 */
const getEntries = async (cond = {}, limit = 10, page = 1, getUser = true) => {
  if (page < 1) {
    return [];
  }
  let entries = await Entry.find(cond).sort('-date').limit(limit).skip((page-1)*limit).exec();
  entries = await Promise.all(entries.map(async (entry) => {
    if (getUser) {      
      const user = await findUser({ _id: entry.user});
      entry.user = user;
    }
    return entry.toJSON();
  }));
  return entries;
}

const saveEntry = (title, body, user) => {
  const entry = new Entry({
    title: title,
    body: body,
    user: user
  });
  entry.save((err) => {
    if (err) {
      console.error(err);
    }
  });
}

module.exports = {findUser, getEntries, saveEntry, countEntry}