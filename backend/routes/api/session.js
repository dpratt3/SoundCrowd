// backend/routes/api/session.js
const express = require("express");

const {
  setTokenCookie,
  restoreUser,
  requireAuth,
} = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Log in
router.post("/", async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  // Body validation errors
  if (!credential && !password) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        credential: "Password is required",
        password: "Password is required",
      },
    });
  }

  if (!credential) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        credential: "Email or username is required",
      },
    });
  }

  if (!password) {
    return res.status(400).send({
      message: "Validation error",
      statusCode: 400,
      errors: {
        password: "Password is required",
      },
    });
  }

  // invalid credentials
  if (!user) {
    // const err = new Error("Login failed");
    // err.message = "Invalid credentials";
    // err.errors = "Invalid credentials";
    // err.statusCode = 401;
    // return res.json(err);
    return res.status(401).send({
      message: "Invalid credentials",
      statusCode: 401,
      errors: {
        email: "Invalid credentials",
      },
    });
  }

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

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Get current user
router.get("/", (req, res) => {
  const { user } = req;

  if (user) {
    const token = setTokenCookie(res, user);
    return res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: token,
    });
  } else return res.json({});
});

// Restore session user
router.get("/", restoreUser, (req, res) => {
  const { user } = req;
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  } else return res.json({});
});

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

// Log in
// router.post("/", validateLogin, async (req, res, next) => {
//   const { credential, password } = req.body;

//   const user = await User.login({ credential, password });

//   if (!user) {
//     const err = new Error("Login failed");
//     err.status = 401;
//     err.title = "Login failed";
//     err.errors = ["The provided credentials were invalid."];
//     return next(err);
//   }

//   await setTokenCookie(res, user);

//   return res.json({
//     user,
//   });
// });

module.exports = router;
