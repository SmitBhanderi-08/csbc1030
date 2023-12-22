
const crypto = require('crypto');

const generateRandomString = (length) => {
  return crypto.randomBytes(length).toString('hex');
};

module.exports = {
  SECRET_KEY: generateRandomString(32)
};
