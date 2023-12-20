const { hash, compare } = require("bcrypt");
const jwt = require("jsonwebtoken");
const TokenBlacklist = require("../models/TokenBlacklist");
const User = require("../models/User");
const { errors, important } = require("../utils/constants/global");

async function register(firstName, lastName, email, password) {
  let user = await getUserByEmail(email);

  if (user) {
    throw new Error(errors.EMAIL_TAKEN);
  }

  const hashedPassword = await hash(password, 10);

  user = new User({
    firstName,
    lastName,
    email,
    hashedPassword,
  });

  await user.save();

  return createToken(user);
}

async function login(email, password) {
  let user = await getUserByEmail(email);

  if (!user) {
    throw new Error(errors.LOGIN);
  }

  const match = await compare(password, user.hashedPassword);

  if (!match) {
    throw new Error(errors.LOGIN);
  }

  return createToken(user);
}

async function logout(token) {
  const result = new TokenBlacklist({
    token,
  });

  await result.save();
}

function createToken(user) {
  const payload = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: jwt.sign(payload, important.SECRET),
  };
}

async function parseToken(token) {
  const result = await TokenBlacklist.find({ token: token });

  if (result.token) {
    throw new Error(errors.TOKEN_EXIST);
  }

  return jwt.verify(JSON.parse(token), important.SECRET);
}

async function getUserByEmail(email) {
  return await User.findOne({ email }).collation({ locale: "en", strength: 2 });
}

module.exports = {
  register,
  login,
  logout,
  parseToken,
};
