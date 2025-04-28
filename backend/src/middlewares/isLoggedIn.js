const userModel = require("../models/userModel");
const bigPromise = require("./bigPromise");
const CustomError = require("../utils/customErrors");
const JWT = require("jsonwebtoken");

//not only verify token is present or not but also enject some info
exports.isLoggedIn = bigPromise(async(req, res, next)=>{

    //extract the token
    let token = req.cookies.token || (req.headers.authorization && req.headers.authorization.replace("Bearer ", ""));
    
    if(!token){
       return next(new CustomError(`first login to access this page`, 401))
    }
    //decode token
    const decoded= JWT.verify(token, process.env.JWT_SECRET)
    req.user = await userModel.findById(decoded.id) //this will be used in the next middleware
    next();
    })

    