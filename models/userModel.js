const {Model} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');
const Post = require('./Post');
const Comment = require('./Comment');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
};

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

User.prototype.getPosts = async function() {
  const allPosts = await Post.findAll({ where: { user_id: this.id } });
  return allPosts;
}

User.prototype.getComments = async function() {
  const allComments = await Comment.findAll({ where: { user_id: this.id } });
  return allComments;
}

module.exports = User;