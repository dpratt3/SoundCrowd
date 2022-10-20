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
  check("firstName").exists().withMessage("Please provide a valid first name."),
  check("lastName").exists().withMessage("Please provide a valid last name."),
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
  const { firstName, lastName, email, password, username } = req.body;

  // Error response: User already exists with the specified email
  const doubledEmail = await User.findOne({
    where: { email },
  });

  if (doubledEmail) {
    return res.status(403).send({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }

  // Error response: User already exists with the specified username
  const doubledUsername = await User.findOne({
    where: { username },
  });

  if (doubledUsername) {
    return res.json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that username already exists",
      },
    });
  }

  // Check for presence of username, first name, last name
  if (!username) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        username: "Username is required",
      },
    });
  }

  if (!firstName) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        firstName: "First name is required",
      },
    });
  }

  if (!lastName) {
    return res.json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        lastName: "Last name is required",
      },
    });
  }

  const user = await User.signup({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  const userObj = user.toJSON();
  const token = await setTokenCookie(res, user);
  userObj.token = token;

  return res.json({
    id: userObj.id,
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    username: userObj.username,
    token: userObj.token,
  });
});

module.exports = router;
