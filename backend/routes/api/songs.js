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
router.delete("/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const currentUserId = user.id;
  //console.log("Song id...................................", id);
  const primaryKey = req.params.songId;
  const song = await Song.findByPk(primaryKey);
  // Song does not exist for provided ID
  if (!song) {
    const err = new Error("Song does not exist");
    err.status = 404;
    err.title = "Song does not exist";
    return res.json(err);
  }
  //console.log("song.userId....................", song.userId, currentUserId);
  // Delete only if current user id equals songId
  if (song.userId === currentUserId) {
    Song.destroy({
      where: {
        id: Number(primaryKey),
      },
    });
    return res.json("Song successfully deleted");
  }
});

// Create a song for an album based on an album's id
router.put("/:songId", requireAuth, async (req, res) => {
  const { title, description, url, imageUrl } = req.body;

  // body validations
  if (!title) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
      },
    });
  }

  if (!url && !title) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
        url: "Audio is required",
      },
    });
  }

  if (!url) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        url: "Audio is required",
      },
    });
  }

  const song = await Song.findOne({
    where: {
      id: req.params.songId,
    },
  });

  if (!song) {
    const err = new Error("Song does not exist");
    err.status = 404;
    err.title = "Song couldn't be found";
    return res.json(err);
  }

  await song.update({
    title: title,
    description: description,
    url: url,
    imageUrl: imageUrl,
  });
  // write the song to the database
  await song.save();
  return res.json(song);
});

//edit an album

module.exports = router;
