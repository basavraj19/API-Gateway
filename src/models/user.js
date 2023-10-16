'use strict';
const {
  Model
} = require('sequelize');

const bycrpt =require('bcrypt');
const {Serverconfig} =require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role,{through : 'User_role'});
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique :true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 10]
      }
    },
    contactNo: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'User',
  });
   User.beforeCreate(function encyptPassword(User){
      const encyptedPassword = bycrpt.hashSync(User.password,+Serverconfig.SALTROUND);
      User.password =encyptedPassword;
   });
  return User;
};