'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {

//#1 set title and body to not allow null
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },

//#2 set topicID in the model
    topicId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here

    Post.belongsTo(models.Topic, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Post;
};