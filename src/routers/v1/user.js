const express=require('express');

const router =express.Router();

const {UserController}=require('../../controller');

const  {UserMiddlware} =require('../../middlewares');

router.post('/signUp',UserController.createUser);

router.post('/signIn',UserMiddlware.validateSignInRequest,UserController.signIn);

router.post('/role',UserMiddlware.checkAuth,UserMiddlware.isAdmin,UserController.addRoleToUser);

module.exports =router;