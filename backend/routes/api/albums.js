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
  return res.json(albums);
});

// Get all albums created by the current user
router.get("/current", requireAuth, async (req, res) => {
  const albums = await Album.findAll({
    where: {
      userId: req.user.id,
    },
  });
  return res.json(albums);
});

// Get all albums of an Artist based on the Artist's id
router.get("/:albumId", requireAuth, async (req, res) => {
  const album = await Album.findAll({
    where: {
      id: req.params.albumId,
    },
    include: [User, Song], // User is the artist
  });
  // if album is an empty array, return an error
  if (!album.length) {
    return res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  } else {
    return res.json(album);
  }
});

module.exports = router;
