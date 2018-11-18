'use strict';
module.exports = (sequelize, DataTypes) => {
  var Flair = sequelize.define('Flair', {

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
  Flair.associate = function(models) {
    // associations can be defined here

    Flair.belongsTo(models.Flair, {
      foreignKey: "topicId",
      onDelete: "CASCADE"
    });
  };
  return Flair;
};