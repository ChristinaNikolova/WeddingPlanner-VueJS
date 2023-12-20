const { emails, errors } = require("../utils/constants/global");
const { mapErrors } = require("../utils/parser");

function isAdmin() {
  return (req, res, next) => {
    if (req.user && req.user.email === emails.ADMIN) {
      next();
    } else {
      const message = mapErrors({ message: errors.NOT_LOGGED_IN });
      res.status(401).json({ message });
    }
  };
}

function hasUser() {
  return (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.status(401).json({ message: errors.NOT_LOGGED_IN });
    }
  };
}

function isGuest() {
  return (req, res, next) => {
    if (req.user) {
      res.status(400).json({ message: errors.ALREADY_LOGGED_IN });
    } else {
      next();
    }
  };
}

module.exports = {
  isAdmin,
  hasUser,
  isGuest,
};
