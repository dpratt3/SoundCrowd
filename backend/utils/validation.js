// backend/utils/validation.js
const { validationResult } = require("express-validator");

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, res, next) => {
  const validationErrors = validationResult(req);

  //console.log(validationErrors.errors[0].param === "username");
  // put in email custom validator
  try {
    const param = validationErrors.errors[0].param;
    if (param === "email") {
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "Invalid email",
        },
      });
    }

    // handle nonexistent username
    const value = validationErrors.errors[0].value;
    if (param === "username" && value.length === 0) {
      return res.json({
        message: "Validation error",
        statusCode: 400,
        errors: {
          email: "Username is required",
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  if (!validationErrors.isEmpty()) {
    const errors = validationErrors.array().map((error) => `${error.msg}`);

    const err = Error("Bad request.");
    err.errors = errors;
    err.status = 400;
    err.title = "Bad request.";
    next(err);
  }
  next();
};

module.exports = {
  handleValidationErrors,
};
