const CrudRepository =require('./Crud-repository');

const { User } =require('../models');

class UserRepository extends CrudRepository{
    constructor()
    {
        super(User)
    }
};

module.exports =UserRepository;