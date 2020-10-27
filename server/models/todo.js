'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {

    static associate(models) {
      ToDo.belongsTo(models.User, {
        foreignKey: 'UserId',
        targetKey: 'id'
      })
    }
  };
  ToDo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `title can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `description can't be empty`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: `status can't be empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty : {
          args: true,
          msg: `due date can't be empty`
        },
        isDate: {
          args: true,
          msg: `must be in date format`
        },
        gtToday(value) {
          const now = new Date()
          if (now >= value) {
            throw new Error('due date should be greater than today')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ToDo',
  });

  ToDo.addHook('beforeValidate', (instance, options) => {
    if (!instance.status) {
      instance.status = false
    }
  })

  return ToDo;
};