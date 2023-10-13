const {UserRepository}=require('../repositories');

const {AppError} =require('../utils');

const {StatusCodes} =require('http-status-codes');

const User = new UserRepository();

async function createUser(data)
{
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError('somthing went wrong while creating user',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createUser
}