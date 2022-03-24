'use strict';

const bcrypt = require('bcrypt')
const appConfig = require('../config/appConfig')
const { Model } = require('sequelize');

const defaultImage = {
  male: 'user-vneck-hair-duotone.svg',
  female: 'user-vneck-hair-long-duotone.svg',
  other: 'circle-user-duotone.svg'
}

module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  const hashPassword = async (user, options) => {

    console.log('hash user before:', user, 'hash password before:', user.password)
    if (user.changed('password')) user.password = await bcrypt.hash(user.password, 10)
    console.log('hash user after:', user, 'hash password after:', user.password)
  }

  users.init({
    userId: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING
    },
    lastName: {
      type: DataTypes.STRING
    },
    lang: {
      type: DataTypes.STRING, 
      isIn: [['en', 'fr', 'es']]
    },
    gender: {
      type: DataTypes.STRING,
      isIn: [['male', 'female', 'other']]
    },
    avatar: {
      type: DataTypes.STRING,
      get: function () {
        const avatar = this.getDataValue('avatar')
        const customPath = !avatar ? defaultImage[this.getDataValue('gender')] : `uploads/${avatar}`
        return `${appConfig.url}/${customPath}`
      }
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
      
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    tableName: 'Users',
    modelName: 'User',
    hooks: {
      beforeCreate: hashPassword, 
      beforeUpdate: hashPassword
    }
  });

  return users;
};