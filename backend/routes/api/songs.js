const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Get all Songs created by the Current User
router.get("/current", requireAuth, async (req, res) => {
  const { user } = req;
  const id = user.id;

  const userSongs = await Song.findAll({
    where: {
      userId: id,
    },
  });
  console.log(userSongs);
  return res.json(userSongs);
});

// Get all Songs (Feature 1)
router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  console.log(songs);
  return res.json(songs);
});

// Get a Song by Id (Feature 1)
router.get("/:songId", async (req, res) => {
  const primaryKey = req.params.songId;
  const song = await Song.findByPk(primaryKey, {
    include: Album,
  });

  // Song does not exist for provided ID
  if (!song) {
    const err = new Error("Song does not exist");
    err.status = 404;
    err.title = "Song does not exist";
    return res.json(err);
  }
  return res.json(song);
});

// Delete a Song (Feature 1)
router.delete("/:songId", async (req, res) => {
  const primaryKey = req.params.songId;
  const song = await Song.findByPk(primaryKey);
  Song.destroy({
    where: {
      id: Number(primaryKey),
    },
  });

  // Song does not exist for provided ID
  if (!song) {
    const err = new Error("Song does not exist");
    err.status = 404;
    err.title = "Song does not exist";
    return res.json(err);
  }
  return res.json("Song successfully deleted");
});

module.exports = router;
