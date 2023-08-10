const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.requestWithdraw = catchAsync(async (req, res, next) => {
    if (!req.body.requestInfo) {
        return next(new AppError('requestInfo is required', 400));
    }
    res.status(200).json({
        data: req.body.requestInfo,
    });
});
