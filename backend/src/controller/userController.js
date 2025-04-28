const UsersModel = require("../models/userModel.js");
const bigPromise = require("../middlewares/bigPromise.js");
const CustomError = require("../utils/customErrors.js");
const cookieToken = require("../utils/cookieToken.js");
require("dotenv").config();

const JWT = require("jsonwebtoken");
const bcyrpt = require("bcrypt");

//--------------------------------------------------------------------------------------------------------------------------------

//_______signup controller_______
// exports.signup=bigPromise(async()=>{})
exports.signup = bigPromise(async (req, res, next) => {
  try {
    console.log("Inside signup controller");
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return next(
        new CustomError("Please provide email, name & password", 400)
      );
    }
    const userExists = await UsersModel.findOne({ email });
    if (userExists) {
      return next(new CustomError("User already exists", 400));
    }
    const user = await UsersModel.create({ name, email, password });
    cookieToken(user, res); //create cookie and send response after successful signup
  } catch (error) {
    console.log(error);
    return next(new CustomError("Internal server error", 500));
  }
});

//--------------------------------------------------------------------------------------------------------------------------------

//_____Login/signIn controller_______

exports.login = bigPromise(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new CustomError("Please provide email & password", 400));
  }
  //grab user from db -> user
  //as we have designed schema select:false we have to provide +password explicitely
  const user = await UsersModel.findOne({ email }).select("+password");

  //if user not present in db
  if (!user) {
    return next(new CustomError("You are not registered in the db", 400));
  }
  //now, user present in db, so check pass with the help of methods in userModel
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new CustomError("Invalid email or password", 401));
  }
  //if pass is correct, then generate token
  cookieToken(user, res);
});

//--------------------------------------------------------------------------------------------------------------------------------
//logout -> we are deleting tokens manually
//jwt tokens are stateless,      //we have value 'token' make it null and set expirary now
exports.logout = bigPromise(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout success",
  });
});
