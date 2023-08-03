const { getUnixTime } = require('date-fns');

const changedPasswordAfter = function (tokenTimeStamp, changePasswordTime) {
    if (changePasswordTime) {
        return tokenTimeStamp < changePasswordTime;
    }
    return false;
};

module.exports = changedPasswordAfter;
