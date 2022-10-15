"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.hasMany(models.Comment, {
        foreignKey: "songId",
        onDelete: "cascade",
        hooks: true,
      });
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        onDelete: "cascade",
        hooks: true,
      });
      Song.belongsTo(models.Album, {
        foreignKey: "albumId",
        onDelete: "CASCADE",
        hooks: true,
      });
      // Song.belongsTo(models.User, {
      //   foreignKey: "userId",
      //   onDelete: "cascade",
      // });
    }
  }
  Song.init(
    {
      albumId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
