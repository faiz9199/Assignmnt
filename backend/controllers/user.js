const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// POST request to register a user
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    savedUser.password = undefined;
    res.status(201).json({ savedUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Error registering user" });
  }
};

// POST request to login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not registered" });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
    if (!isPassEqual) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const tokenObject = {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    };
    const token = jwt.sign(tokenObject, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      maxAge: 4 * 60 * 60 * 1000,
    };
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json({ error: "Error login user" });
  }
};

// GET request to logout user
const logoutUser = (req, res) => {
  res.cookie("token", " ", { expiresIn: new Date(0) });
  res.status(200).json({ message: "Logout successful" });
};

const loggedInStatus = (req, res) => {
  if (req.isAuthenticated) {
    res.json({ loggedIn: true, user: req.user });
  } else {
    res.json({ loggedIn: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  loggedInStatus,
};
