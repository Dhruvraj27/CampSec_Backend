const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../Schema/UserSchema/UserSchema");
const signUpController = async (req, res) => {
  try {
    console.log("hello sahi hai bhai");
    console.log(req.body, "show the request body here now");
    let { email, password } = req.body;
    const emailExist = await userSchema.findOne({ email });
    console.log(emailExist, "emailExist here 00000000");
    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (!password) {
      return res.status(400).json({ message: "something went wrong" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let response = new userSchema({
      email: email,
      password: hashedPassword,
    });
    response = await response.save();

    const token = await jwt.sign(
      {
        email: email,
        password: hashedPassword,
        id: response._id,
      },
      process.env.SECRET_KEY
    );

    return res.json({
      data: {
        accessToken: token,
        userData: response,
        message: "userRegistered SuccessFully",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something Went Wrong" });
  }
};

const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userSchema.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "Email is Not Valid" });
    }
    const verifyPassword = await bcrypt.compare(password, userExist.password);
    if (!verifyPassword) {
      return res.status(400).json({ message: "email or Password is wrong" });
    }
    const token = await jwt.sign(
      {
        email: userExist.email,
        password: userExist.password,
        id: userExist._id,
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      message: "user Logged in SuccessFully",
      accessToken: token,
      data: userExist,
    });
  } catch (error) {
    res.json({ message: "Something went wrong" });
    console.log(error);
  }
};

module.exports = {
  signUpController,
  signInController,
};
