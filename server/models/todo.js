'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ToDo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ToDo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        costum(value) {
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

  ToDo.addHook('beforeCreate', (instance, options) => {
    instance.status = false
  })

  return ToDo;
};