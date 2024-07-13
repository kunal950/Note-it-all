const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.json({ error: true, message: "User already exist" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });

  await user.save();
  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "User registered successfully",
  });
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ error: true, message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: true, message: "User does not exist" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ error: true, message: "Invalid credentials" });
  }
  const accessToken = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    error: false,
    user,
    accessToken,
    message: "User logged in successfully",
  });
};

module.exports.getUser = async (req, res, next) => {
  const { user } = req.user;
  const userData = await User.findOne({ _id: user._id });
  if (!userData) {
    return res.json({ error: true, message: "User not found" });
  }
  return res.json({
    error: false,
    user: {
      name: userData.name,
      email: userData.email,
      _id: userData._id,
    },
  });
};
