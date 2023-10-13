const express =require('express');

const router =express.Router();

const {response , response1} = require('../../controller');

const userRounter=require('./user');

router.get('/',response.response);

router.get('/home',response1.response1);

router.use('/user',userRounter);

module.exports =router;

