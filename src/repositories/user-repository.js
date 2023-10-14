const CrudRepository =require('./Crud-repository');

const { User } =require('../models');

class UserRepository extends CrudRepository{
    constructor()
    {
        super(User)
    }
    async getUserbyUserId(userId)
    {
       const user = await User.findOne({where : {userId : userId}});
       return user;
    }
};

module.exports =UserRepository;