const express=require("express");
const mongoose=require("mongoose");
const bigPromise = require("../middlewares/bigPromise.js");
const CustomError = require("../utils/customErrors.js");

const recipesModel=require("../models/recipeModel");
const UserModel=require("../models/userModel");



// //----------------------------------------------------------------------------------

exports.getAllRecipes=bigPromise(async(req,res,next)=>{
    const result=await recipesModel.find({});
    res.status(200).json(result);
})


// //------------------------------------------------------------------------------------

exports.createRecipe=bigPromise(async(req,res,next)=>{
    const {name,ingredients,instructions,imageUrl,cookingTime} =req.body;
    const userObjID=req.user._id;
    const userOwner=userObjID.toString();

    //console.log("user ki id: ",userOwner);

    if(!userOwner){
        return next(new CustomError("Please provide user id",400));
    }
    if(!name || !ingredients || !instructions || !cookingTime ){
        return next(new CustomError("Please provide all the fields",400));
    }

    //create recipe from model 
    const recipe=new recipesModel(
        {
            _id: new mongoose.Types.ObjectId(), //this is for unique id // we can use uuid also 
            name:name,
            ingredients:ingredients,
            instructions:instructions,
            imageUrl:imageUrl,
            cookingTime:cookingTime,
            userOwner:userOwner
        }   
    );
    console.log("Recipe is here:", recipe);
    
    //save created recipe in DB
    const result=await recipe.save();
    res.status(201).json({
        createdRecipe: {
            name: result.name,
            imageUrl: result.imageUrl,
            ingredients: result.ingredients,
            instructions: result.instructions,
            userOwner: result.userOwner,
            _id: result._id.toString(),
          },
    });
})



// //------------------------------------------------------------------------------------


exports.getRecipeById=bigPromise(async(req,res,next)=>{
    const{recipeId} =req.params;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findById({ _id: recipeId });
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json(result);
})


// //------------------------------------------------------------------------------------


exports.saveRecipes=bigPromise(async(req,res,next)=>{
    const {recipeId,userId}=req.body;
    if(!recipeId || !userId){
        return next(new CustomError("Please provide recipe id & user id",400));
    }
    const recipe= await recipesModel.findById(recipeId);
    if(!recipe){
        return next(new CustomError("No recipe found with this id",404));
    }
    const user= await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    user.savedRecipes.push(recipe);
    await user.save();
    res.status(201).json({savedRecipes: user.savedRecipes});
})


// //------------------------------------------------------------------------------------



exports.getSavedRecipeById=bigPromise(async(req,res,next)=>{
    const {userId}=req.params;
    if(!userId){
        return next(new CustomError("Please provide user id",400));
    }
    const user = await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    const savedRecipes = user ? user.savedRecipes : [];
    res.status(201).json({ savedRecipes });
})
  


// //------------------------------------------------------------------------------------


exports.getSavedRecipes=bigPromise(async(req,res,next)=>{
    const {userId}=req.params;
    if(!userId){
        return next(new CustomError("Please provide user id",400));
    }
    const user = await UserModel.findById(userId);
    if(!user){
        return next(new CustomError("No user found with this id",404));
    }
    const savedRecipes = await recipesModel.find({
      _id: { $in: user.savedRecipes },
    });
    console.log(savedRecipes);
    res.status(201).json({ savedRecipes });
})


// //------------------------------------------------------------------------------------


exports.deleteRecipe=bigPromise(async(req,res,next)=>{
    const {recipeId}=req.params;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findByIdAndDelete(recipeId);
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json({message: "Recipe deleted successfully"});
})



// //------------------------------------------------------------------------------------

exports.updateRecipe=bigPromise(async(req,res,next)=>{
    const {recipeId}=req.params;
    const {name,ingredients,instructions,imageUrl,cookingTime}=req.body;
    if(!recipeId){
        return next(new CustomError("Please provide recipe id",400));
    }
    const result=await recipesModel.findByIdAndUpdate(recipeId,{
        name:name,
        ingredients:ingredients,
        instructions:instructions,
        imageUrl:imageUrl,
        cookingTime:cookingTime
    });
    if(!result){
        return next(new CustomError("No recipe found with this id",404));
    }
    res.status(200).json({message: "Recipe updated successfully"});
})