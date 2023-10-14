const { Errorrespones } = require('../utils/common');

const { UserService } = require('../services');

const AppError = require('../utils/error/AppError');

const { StatusCodes } = require('http-status-codes');

function validateSignInRequest(req, res, next) {
    if (!req.body.userId) {
        Errorrespones.message = 'Something went wrong while authenticating user';
        Errorrespones.error = new AppError('UserId is missing', StatusCodes.BAD_REQUEST);
        return res.status(Errorrespones.error.statuscode).json(Errorrespones);
    }

    if (!req.body.password) {
        Errorrespones.message = 'Something went wrong while authenticating user';
        Errorrespones.error = new AppError('Password is missing', StatusCodes.BAD_REQUEST);
        return res.status(Errorrespones.error.statuscode).json(Errorrespones);
    }
    next();
}

async function validateSignInRequestByToken(req, res, next) {
    if (!req.headers['x-access-token']) {
        Errorrespones.message = 'Something went wrong while authenticating user';
        Errorrespones.error = new AppError('Missing JWT', StatusCodes.BAD_REQUEST);
        return res.status(Errorrespones.error.statuscode).json(Errorrespones);
    }
    next();
}

module.exports = {
    validateSignInRequest,
    validateSignInRequestByToken
}