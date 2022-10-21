const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Create an album
router.post("/", requireAuth, async (req, res) => {
  const { title, description, imageUrl } = req.body;

  if (!title) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Album title is required",
      },
    });
  }

  const album = await Album.create({
    userId: req.user.id,
    title: title,
    description: description,
    imageUrl: imageUrl,
  });

  return res.json(album);
});

// Get all albums
router.get("/", requireAuth, async (req, res) => {
  const albums = await Album.findAll({});
  return res.json({
    Albums: albums,
  });
});

// Get all albums created by the current user
router.get("/current", requireAuth, async (req, res) => {
  const albums = await Album.findAll({
    where: {
      userId: req.user.id,
    },
  });
  return res.json({
    Albums: albums,
  });
});

// Get all albums of an Artist based on the Albums id
router.get("/:albumId", requireAuth, async (req, res) => {
  const album = await Album.findAll({
    where: {
      id: req.params.albumId,
    },
    include: [User, Song], // User is the artist
  });
  // if album is an empty array, return an error
  if (!album.length) {
    return res.status(404).send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.json(album);
  }
});

// Get all albums of an Artist based on the Artist's id
router.get("/:userId", requireAuth, async (req, res) => {
  const album = await Album.findAll({
    where: {
      id: req.params.userId,
    },
    //include: [User, Song], // User is the artist
  });
  // if album is an empty array, return an error
  if (!album.length) {
    return res.status(404).send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.json(album);
  }
});

// Delete an Album
router.delete("/:albumId", requireAuth, async (req, res) => {
  const { user } = req;
  const currentUserId = user.id;
  //console.log("Song id...................................", id);
  const albumKey = req.params.albumId;
  const album = await Album.findOne({
    where: {
      id: albumKey,
    },
  });
  // Song does not exist for provided ID
  if (!album) {
    return res.status(404).send({
      message: "Album could not be found",
      statusCode: 404,
    });
  }
  //console.log("song.userId....................", song.userId, currentUserId);
  // Delete only if current user id equals albumId
  if (album.userId === currentUserId) {
    Album.destroy({
      where: {
        id: albumKey,
      },
    });
    return res.json({
      message: "Album successfully deleted",
      statusCode: 200,
    });
  } else {
    return res.json({
      message: "Artists may only delete albums that they own.",
      status: 401,
    });
  }
});

// Create a song for an album based on an album's id
router.put("/:albumId", requireAuth, async (req, res) => {
  const { title, description, imageUrl } = req.body;

  // body validations
  if (!title) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
      },
    });
  }

  const album = await Album.findOne({
    where: {
      id: req.params.albumId,
    },
  });

  if (!album) {
    return res.status(404).send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }

  await album.update({
    title: title,
    description: description,
    imageUrl: imageUrl,
  });

  // write the album to the database
  await album.save();
  return res.json(album);
});

module.exports = router;
