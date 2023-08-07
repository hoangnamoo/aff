const { User } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getMe = catchAsync(async (req, res, next) => {
    const currentUser = await User.findByPk(req.user.userId);
    res.status(200).json({
        status: 'success',
        data: currentUser,
    });
});
