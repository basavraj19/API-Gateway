const CrudRepository =require('./Crud-repository');

const { Role } =require('../models');

class UserRepository extends CrudRepository{
    constructor()
    {
        super(Role);
    }
    async getRoleByName(name)
    {
       const role = await Role.findOne({where : {name : name}});
       return role;
    }

    async getRoleByPk(roleId)
    {
       const role = await Role.findByPk(roleId);
       return role;
    }
};

module.exports =UserRepository;