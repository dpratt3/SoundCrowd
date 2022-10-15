// backend/routes/api/users.js
// const express = require("express");
// const router = express.Router();

// module.exports = router;

// const express = require("express");

// const { setTokenCookie, requireAuth } = require("../../utils/auth");
// const { User } = require("../../db/models");

// const router = express.Router();

// // Sign up
// router.post("/", async (req, res) => {
//   const { email, password, username } = req.body;
//   const user = await User.signup({ email, username, password });

//   await setTokenCookie(res, user);

//   return res.json({
//     user,
//   });
// });

// module.exports = router;

const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, password, username } = req.body;
  const user = await User.signup({ email, username, password });

  await setTokenCookie(res, user);

  return res.json({
    user,
  });
});

// Get all Songs (Feature 1)
router.get("/songs", async (req, res) => {
  const songs = await Song.findAll();
  console.log(songs);
  return res.json(songs);
});

// Get a Song by Id (Feature 1)
router.get("/songs/:songId", async (req, res) => {
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
router.delete("/songs/:songId", async (req, res) => {
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
