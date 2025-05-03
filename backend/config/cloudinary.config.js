const { CLOUD } = require(".");

const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// console.log("API KEY:" + process.env.CLOUDINARY_API_KEY);

cloudinary.config({
  cloud_name: CLOUD.CLOUD_NAME,
  api_key: CLOUD.API_KEY,
  api_secret: CLOUD.API_SECRET,
});

module.exports = cloudinary;
