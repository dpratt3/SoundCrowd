const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

router.get("/:userId/songs", requireAuth, async (req, res) => {
  console.log(req.params.userId);
  const songs = await Song.findAll({
    where: {
      userId: req.params.userId,
    },
    //include: [Song], // User is the artist
  });
  console.log(songs);
  const songsObj = { Songs: songs };
  // if album is an empty array, return an error
  if (!songs.length) {
    return res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.json(songsObj);
  }
});

router.get("/:artistId/albums", requireAuth, async (req, res) => {
  console.log(req.params.aristId);
  const albums = await Album.findAll({
    where: {
      userId: req.params.artistId,
    },
    //include: [Song], // User is the artist
  });
  console.log(albums);

  // if album is an empty array, return an error
  if (!albums.length) {
    return res.status(404).send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.json({
      Albums: albums,
    });
  }
});

module.exports = router;
