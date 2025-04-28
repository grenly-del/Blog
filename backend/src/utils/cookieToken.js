const JWT = require("jsonwebtoken");

const cookieToken = (user, res) => {
  console.log("JWT_COOKIE:", process.env.JWT_COOKIE); // Debugging nilai JWT_COOKIE

  const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION + "d", // Menggunakan nilai JWT_COOKIE dan mengonversinya ke string durasi
  });

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRATION * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  user.password = undefined;

  res.status(200).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = cookieToken;
