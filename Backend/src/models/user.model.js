const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username is already exists"],
        required: [true, "User name is required"]
    },

    email: {
        type: String,
        unique: [true, "email is already exists"],
        required: [true, "email name is required"]

    },

    password: { 
        type: String,
        required: [true, "password is required"],
        select: false

    },
    bio:String,
    profileImage: { 
        type:String,
        default: "https://ik.imagekit.io/ub1zxr8au/images.png?updatedAt=1770786510417"
    }

})

 const userModel = mongoose.model("users" , userSchema)

 module.exports = userModel