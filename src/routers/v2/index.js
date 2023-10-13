const express =require('express');

const router =express.Router();

router.get('/',(req,res)=>{
       return res.json({
            mess : "ok"
        });
});

router.get('/home',(req,res)=>{
   return res.json({
        message :"basavraj"
    });
});

module.exports =router;