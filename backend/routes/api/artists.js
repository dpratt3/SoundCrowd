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

module.exports = router;
