const { Errorrespones } = require('../utils/common');

const { UserService } = require('../services');

const AppError = require('../utils/error/AppError');

const { StatusCodes } = require('http-status-codes');

const { UserRepository } = require('../repositories');

const User = new UserRepository();

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

async function checkAuth(req, res, next) {
    try {
        if (!req.headers['x-access-token']) {
            Errorrespones.message = 'Something went wrong while authenticating user';
            Errorrespones.error = new AppError('Missing JWT', StatusCodes.NOT_FOUND);
            return res.status(Errorrespones.error.statuscode).json(Errorrespones);
        }
        const response = await UserService.isAuthenticated(req.headers['x-access-token']);
        if (response) {
            req.user = response; // setting the user id in the req object
            next();
        }
    } catch (error) {
        Errorrespones.error = error;
        return res.status(error.statuscode).json(Errorrespones);
    }

}

async function isAdmin(req, res, next) {
    const response = await UserService.isAdmin(req.user);
    if (!response) {
        Errorrespones.message = 'User donot have the authority for this action';
        Errorrespones.error = new AppError('unauthorised', StatusCodes.UNAUTHORIZED);
        return res.status(Errorrespones.error.statuscode).json(Errorrespones);
    }
    next();
}

async function isUser(req, res, next) {
    const response = await UserService.isUser(req.body.userId);
    if (!response) {
        Errorrespones.message = 'User donot have the authority for this action';
        Errorrespones.error = new AppError('unauthorised', StatusCodes.UNAUTHORIZED);
        return res.status(Errorrespones.error.statuscode).json(Errorrespones);
    }
    next();
}

async function checkAuthorization(req, res, next) {
     var requestType=req.method;
     if(requestType==='GET'){
       next();
     }
     var user =await User.getUserbyUserId(req.headers.userid);
     var Admin = await UserService.isAdmin(user.id);
     if(Admin){
       next();
     }else{
     Errorrespones.message = 'User donot have the authority for this action';
     Errorrespones.error = new AppError('unauthorised', StatusCodes.UNAUTHORIZED);
     return res.status(Errorrespones.error.statuscode).json(Errorrespones);
     }
}


module.exports = {
    validateSignInRequest,
    checkAuth,
    isAdmin,
    isUser,
    checkAuthorization,
}