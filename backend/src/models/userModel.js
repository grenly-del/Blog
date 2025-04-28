const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt = require('bcryptjs');
const JWT=require("jsonwebtoken");
const crypto=require("crypto");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter a username"],
        maxlength: [20, "Username cannot be more than 20 characters"],
    },
    email:{
        type:String,
        required: [true, "Please enter an email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type:String,
        required: [true, "Please enter a password"],
        minlength: [6, "Password cannot be less than 6 characters"],    
        select : false,   //password will not be shown in response 
    },
    savedRecipes: [
        { 
          type: mongoose.Schema.Types.ObjectId,
          ref: "Recipes"
         }
    ],
    forgotPasswordToken: String,
    forgotPasswordExpire: Date,
    createdAt  : {  type: Date, default: Date.now },

});


// Encrypt password before saving
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){  //if password is not modified
        return next();
    }
    this.password=await bcrypt.hash(this.password, 10);
    next();
});


// Compare user entered password with database password
userSchema.methods.comparePassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

/// Return JWT token
userSchema.methods.getJWTToken=function(){
    return JWT.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    });
}

//generate password reset token
userSchema.methods.getResetPasswordToken=function(){
    //generate token
    const resetToken=crypto.randomBytes(20).toString("hex");
    //hash and set to resetPasswordToken
    this.forgotPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
    //set token expire time
    this.forgotPasswordExpire=Date.now() + 30 * 60 * 1000;
    return resetToken;
}


module.exports=mongoose.model("User", userSchema);