require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

const APPS = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

const DB = {
  DB_BASE_URL: process.env.DB_BASE_URL,
  DB_NAME: process.env.DB_NAME,
};

const CLOUD = {
  CLOUD_NAME: process.env.CLOUDINARY_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_SECRET_KEY,
};
module.exports = { APPS, DB, CLOUD };
