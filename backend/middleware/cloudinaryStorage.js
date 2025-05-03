const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary.config"); // Pastikan sudah dikonfigurasi

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes", // Folder di Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

module.exports = upload;
