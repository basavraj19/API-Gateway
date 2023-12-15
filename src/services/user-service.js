const { UserRepository , RoleRepository} = require('../repositories');

const { AppError } = require('../utils');

const { StatusCodes } = require('http-status-codes');

const { Auth } = require('../utils/common');

const User = new UserRepository();

const Role = new RoleRepository();

const { ENUM } =require('../utils/common');
const { CUSTOMER, ADMIN } =ENUM.UserRoles;

async function createUser(data) {
    try {
        const user = await User.create(data);
        const role = await Role.getRoleByName(CUSTOMER);
        user.addRole(role);
        return user;
    } catch (error) {
        console.log(error);
        throw new AppError('somthing went wrong while creating user', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function signIn(data) {
    try {
        const user = await User.getUserbyUserId(data.userId);
        if (!user) {
            throw new AppError('Invalid userId', StatusCodes.NOT_FOUND);
        }
        const validUser = Auth.verifyPassword(data.password, user.password);
        if (!validUser) {
            throw new AppError('Invalid Password', StatusCodes.NOT_FOUND);
        }
        const token = Auth.generateToken({ id: user.id, userId: user.userId });
        return token;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function isAuthenticated(token) {
    try {
        const response = Auth.verifyToken(token);
        const user = await User.get(response.id);
        if (!user) {
            throw new AppError('User Not Found', StatusCodes.NOT_FOUND);
        }
        return user.id;
    } catch (error) 
    {
        if( error instanceof AppError) throw error;
        
        if (error.name == 'JsonWebTokenError') {
            throw new AppError('Invalid JWT token', StatusCodes.BAD_REQUEST);
        }

        if(error.name == 'TokenExpiredError') {
            throw new AppError('JWT token expired', StatusCodes.BAD_REQUEST);
        }

        throw new AppError('Something went wrong', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function isAdmin(id){
    try {
        const user = await User.get(id);
        if(!user)
        {
            throw new AppError('User Not Found', StatusCodes.NOT_FOUND);
        }
        const role =await Role.getRoleByName(ADMIN);
        return user.hasRole(role);
    } catch (error) {
        throw error;
    }
}
async function addRoleToUser(data)
{
    try {
        const user = await User.getUserbyUserId(data.userId);
        if(!user)
        {
            throw new AppError('User Not Found', StatusCodes.NOT_FOUND);
        }
        const role =await  Role.getRoleByPk(data.roleId);
        if(!role)
        {
            throw new AppError('Invalid Role Id', StatusCodes.BAD_REQUEST);
        }
        user.addRole(role);
    } catch (error) {
        throw error;
    }
}

async function isUser(userId){
    try {
        const user= await User.get(userId);
        if(!user)
        {
            throw new AppError('User Not Found', StatusCodes.NOT_FOUND);
        }
        const role= await Role.getRoleByName(CUSTOMER);
        if(!role)
        {
            throw new AppError('Invalid Role Id', StatusCodes.BAD_REQUEST);
        }
        user.hasRole(role);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    signIn,
    isAuthenticated,
    addRoleToUser,
    isAdmin,
    isUser
}