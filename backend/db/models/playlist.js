"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsToMany(models.Song, {
        through: models.PlaylistSong,
        onDelete: "CASCADE",
        hooks: true,
      });
      Playlist.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  Playlist.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Playlist",
    }
  );
  return Playlist;
};
