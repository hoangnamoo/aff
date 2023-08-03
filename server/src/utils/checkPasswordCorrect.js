const bcrypt = require('bcrypt');

const checkPasswordCorrect = async function (inputPassword, dbPassword) {
    return await bcrypt.compare(inputPassword, dbPassword);
};

module.exports = checkPasswordCorrect;
