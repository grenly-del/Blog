//this controller containsprevious methods implemented via try catch blocks 

// const express=require("express");
// const mongoose=require("mongoose");
// const bigPromise = require("../middlewares/bigPromise.js");
// const CustomError = require("../utils/customErrors.js");

// const recipesModel=require("../models/recipeModel");
// const UserModel=require("../models/userModel");


// exports.createRecipe=async(req,res)=>{
//     const {name,image,ingredients,instructions,imageUrl,cookingTime,userOwner} =req.body;
//     //create recipe from model 
//     const recipe=new recipesModel(
//         {
//             _id: new mongoose.Types.ObjectId(),
//             name:name,
//             image:image,
//             ingredients:ingredients,
//             instructions:instructions,
//             imageUrl:imageUrl,
//             cookingTime:cookingTime,
//             userOwner:userOwner
//         }   
//     );
//     console.log("Recipe is here:", recipe);
    
//     //save created recipe in DB
//     try{
//         const result=await recipe.save();
//         res.status(201).json({
//             createdRecipe: {
//                 name: result.name,
//                 image: result.image,
//                 ingredients: result.ingredients,
//                 instructions: result.instructions,
//                 _id: result._id
//               },
//         });
//     }catch(error){
//         res.status(500).json({ error:error.message });
//     }
// }



// exports.getRecipeById=async(req,res)=>{
//     const{recipeId} =req.params;
//     try{
//         const result=await recipesModel.findById({ _id: recipeId });
//         res.status(200).json(result);
//     }catch(error){
//         res.status(500).json({ error: error.message });
//     }
// }

// exports.saveRecipes=async(req,res)=>{
//     const recipe= await recipesModel.findById(req.body.recipeId);
//     const user= await UsersModel.findById(req.body.userId);
//     try{
//         user.savedRecipes.push(recipe);
//         await user.save();
//         res.status(201).json({savedRecipes: user.savedRecipes});
//     }catch(error){
//         res.status(500).json({error:error.message});
//     }
// }


// exports.getIdOfSavedRecipe = async (req, res) => {
//     try {
//       const user = await UsersModel.findById(req.params.userId);
//       const savedRecipes = user ? user.savedRecipes : [];
//       res.status(201).json({ savedRecipes });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }



// exports.getSavedRecipes=async(req,res)=>{
//     try{
//         const user = await UsersModel.findById(req.params.userId);
//         const savedRecipes = await recipesModel.find({
//           _id: { $in: user.savedRecipes },
//         });
//         console.log(savedRecipes);
//         res.status(201).json({ savedRecipes });

//     }catch(error){
//         res.status(500).json({error:error.message});
//     }
// }