const {UserService} =require('../services');

const {Successresponse, Errorrespones}=require('../utils/common'); 

const {StatusCodes}=require('http-status-codes');

async function createUser(req,res)
{
    try {
        const response = await UserService.createUser({
            name : req.body.name,
            userId : req.body.userId,
            password : req.body.password,
            contactNo : req.body.contactNo
        });
        Successresponse.data =response;
        return res.status(StatusCodes.CREATED).json(Successresponse); 
    } catch (error) {
        Errorrespones.error =error;
        return res.status(error.statuscode).json(Errorrespones);
    }
}

async function signIn(req,res)
{
    try {
        const response = await UserService.signIn({
            userId : req.body.userId,
            password : req.body.password,
        });
        Successresponse.data =response;
        return res.status(StatusCodes.OK).json(Successresponse); 
    } catch (error) {
        Errorrespones.error =error;
    }
}

async function addRoleToUser(req, res) {
    try {
        const response = await UserService.addRoleToUser({
            userId : req.body.userId,
            roleId : req.body.roleId
        });
        Successresponse.data =response;
        return res.status(StatusCodes.OK).json(Successresponse); 
    } catch (error) {
        Errorrespones.error =error;
        return res.status(error.statuscode).json(Errorrespones);
    }
}

module.exports  ={
    createUser,
    signIn,
    addRoleToUser
}