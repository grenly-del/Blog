const jwt = require('jsonwebtoken')
const Users = require('../app/users/user.model');
const { appRes } = require('../utils/appRes');

const verifyToken = async (req, res, next) => {
    try {
        const key = process.env.SECRET_KEY;
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(" ")[1];

        if (!token) return appRes(res, 401, 'Akses ditolak! Token tidak ada');

        jwt.verify(token, key, async (err, decoded) => {
            if (err) return appRes(res, 403, 'Token tidak valid atau expired');

            const currentUser = await Users.findById(decoded.userId);
            if (!currentUser) return appRes(res, 403, 'User tidak ditemukan!');
            req.user = decoded;
            console.log('User ID:', decoded.userId);
            next();
        });
    } catch (error) {
        console.error(error);
        appRes(res, 500, 'Terjadi kesalahan pada server');
    }
};


module.exports = verifyToken