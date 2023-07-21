module.exports = (err, req, res, next) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        stack: err.stack,
        message: err.message,
    });
};
