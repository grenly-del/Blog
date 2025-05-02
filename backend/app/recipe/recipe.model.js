const mongoose=require("mongoose");
const validator=require("validator");

const recipeSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter a recipe name"],
        maxlength:[20,"Recipe name cannot be more than 20 characters"]
    },
    //as we can have multiple ingredients //we will take array
    ingredients:[
        {
            type:String,
            required:[true,"Please enter ingredients"],
            maxlength:[40,"Ingredients cannot be more than 40 characters"]
        }
    ],
    instructions:{
        type:String,
        required:[true,"Please enter instructions"],
        maxlength:[200,"Instructions cannot be more than 200 characters"]
    },
    imageUrl:{
        type:String,
        // required:[true,"Please enter image url"],
        validate:[validator.isURL,"Please enter a valid url"]
    },
    cookingTime:{
        type:Number,
        required:[true,"Please enter cooking time"],
        min:[1,"Cooking time cannot be less than 1 minute"]
    },
    //to keep track of owner who created recipe
    userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

})


module.exports=mongoose.model("Recipes", recipeSchema);