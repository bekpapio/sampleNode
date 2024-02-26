const User = require("../models/user");
const bcrypt = require("bcrypt")
const jwt=require('jsonwebtoken')
const register = async (req, res) => {
  const { name, email,password } = req.body;
  if (!name | !password|email) {
    return res.status(403).send({ message: "all fields are required" });
  }
  try {
    const hashPassword=await bcrypt.hash(password,10)
    const user = await User.create({
      name,
      email,
      password:hashPassword
    });
    res.status(201).json({
      message: "user created succesfully",
      user:{
        name: user.name,
        email: user.email
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "error creating user",
    });
  }
};
const login = async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body ; // Handle missing request body more gracefully

    // Retrieve user from database (assuming User is a Mongoose model)
    const user = await User.findOne({ email });

    // Validate credentials
    if (!user || !(await bcrypt.compare(password, user?.password))) {
      return res.status(401).json({ message: "Invalid credentials" }); // Use 401 for unauthorized access
    }

    // Generate JWT with appropriate claims and expiration time
    const token = jwt.sign({ userId: user._id }, process.env.privateKey, {
      expiresIn: "59m",
    });

    // Send successful login response with token
    res.status(200).send({ token });
  } catch (error) {
    console.error(error); // Log errors for debugging
    res.status(500).send({ message: "Internal server error" }); // Handle unexpected errors gracefully
  }
};

module.exports = {
  register,
  login
};
