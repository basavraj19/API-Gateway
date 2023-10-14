const express =require('express');

const router =express.Router();

const userRounter=require('./user');

router.use('/user',userRounter);

module.exports =router;

