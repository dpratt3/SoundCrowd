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
  return res.json({
    Songs: userSongs,
  });
});

// Get all Songs (Feature 1)
router.get("/", async (req, res) => {
  const songs = await Song.findAll({
    include: User,
  });
  return res.json({
    Songs: songs,
  });
});

// Get a Song by Id (Feature 1)
router.get("/:songId", async (req, res) => {
  const primaryKey = req.params.songId;
  const song = await Song.findByPk(primaryKey, {
    include: [Album, User],
  });

  // Song does not exist for provided ID
  if (!song) {
    // const err = new Error("Song does not exist");
    // err.status = 404;
    // err.title = "Song does not exist";
    // return res.json(err);
    return res.status(404).send({
      message: "Song does not exist",
      statusCode: 404,
      // errors: {
      //   email: "User with that username already exists",
      // },
    });
  }
  return res.json(song);
});

// Delete a Song (Feature 1)
router.delete("/:songId", requireAuth, async (req, res) => {
  const { user } = req;
  const currentUserId = user.id;
  console.log(
    "current user id...................................",
    currentUserId
  );
  const primaryKey = req.params.songId;
  const song = await Song.findByPk(primaryKey);
  // Song does not exist for provided ID
  if (!song) {
    // const err = new Error("Song does not exist");
    // err.status = 404;
    // err.title = "Song does not exist";
    // return res.json(err);
    return res.status(404).send({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
  console.log("song.userId....................", song.userId, currentUserId);
  // Delete only if current user id equals songId
  if (song.userId === currentUserId) {
    Song.destroy({
      where: {
        id: Number(primaryKey),
      },
    });
    return res.status(200).send({
      message: "Song successfully deleted",
      status: 200,
    });
  } else {
    return res.json({
      message: "Artists may only delete songs that they own.",
      status: 401,
    });
  }
});

// Create a song for an album based on an album's id
router.post("/", requireAuth, async (req, res) => {
  const { title, description, imageUrl, url, albumId } = req.body;
  console.log(req.user.id);
  if (!title) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Album title is required",
      },
    });
  }

  if (!url) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        url: "Audio is required",
      },
    });
  }

  // See if album with specified ID exists
  const album = await Album.findOne({
    where: {
      id: albumId,
    },
  });

  console.log(album);
  // if there is no album with id matching albumId, return error
  if (!album && albumId !== null) {
    return res.status(404).send({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }

  // no album id, no problem
  if (!albumId) {
    const song = await Song.create({
      userId: req.user.id,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
    });

    return res.json(song);
  }

  // only allow users who own the album to add a song
  if (req.user.id === album.userId) {
    const song = await Song.create({
      userId: req.user.id,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
    });

    return res.json(song);
  }
});

// Create a song for an album based on an album's id
router.post("/", requireAuth, async (req, res) => {
  const { title, description, imageUrl, url, albumId } = req.body;
  console.log(req.user.id);
  if (!title) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Album title is required",
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

  // See if album with specified ID exists
  const album = await Album.findOne({
    where: {
      id: albumId,
    },
  });

  console.log(album);
  // if there is no album with id matching albumId, return error
  if (!album && albumId !== null) {
    return res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }

  // no album id, no problem
  if (!albumId) {
    const song = await Song.create({
      userId: req.user.id,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
    });

    return res.json(song);
  }

  // only allow users who own the album to add a song
  if (req.user.id === album.userId) {
    const song = await Song.create({
      userId: req.user.id,
      title: title,
      description: description,
      url: url,
      imageUrl: imageUrl,
      albumId: albumId,
    });

    return res.json(song);
  }
});

// Create a song for an album based on an album's id
router.put("/:songId", requireAuth, async (req, res) => {
  const { title, description, url, imageUrl } = req.body;

  // body validations
  if (!url && !title) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
        url: "Audio is required",
      },
    });
  }

  if (!title) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        title: "Song title is required",
      },
    });
  }

  if (!url) {
    return res.status(400).send({
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
    return res.status(404).send({
      message: "Song couldn't be found",
      statusCode: 404,
      // errors: {
      //   url: "Audio is required",
      // },
    });
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

module.exports = router;
