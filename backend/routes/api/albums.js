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
  const { title, description, imageUrl } = req.body;
  const albums = await Album.findAll({});
  return res.json(albums);
});

module.exports = router;
