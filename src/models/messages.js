'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'fromUserId'})
    }
  }
  Messages.init({
    message: DataTypes.STRING,
    fromUserId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    inLang: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sessionId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'Messages'
  });
  return Messages;
};