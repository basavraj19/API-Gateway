const express =require('express');

const router =express.Router();

const {response , response1} = require('../../controller');

router.get('/',response.response);

router.get('/home',response1.response1);

module.exports =router;

