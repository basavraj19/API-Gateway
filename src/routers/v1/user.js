const express=require('express');

const router =express.Router();

const {UserController}=require('../../controller');

router.get('/signUp',UserController.createUser);

module.exports =router;