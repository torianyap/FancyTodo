'use strict';
const {Model} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.hasMany(models.ToDo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'please insert a valid email'
        },
        notEmpty: {
          args: true,
          msg: `email can't be empty`
        },
        notNull: {
          args: true,
          msg: `email can't be empty`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: `password can't be empty`
        },
        notEmpty: {
          args: true,
          msg: `password can't be empty`
        },
        isAlphanumeric: {
          args: true,
          msg: `password must be alphanumeric`
        },
        len: {
          args: [6,20],
          msg: `password must be a minimal of 6 and a maximum of 20 characters`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook('beforeCreate', (instance, options) => {
    instance.password = hashPassword(instance.password)
  })

  return User;
};