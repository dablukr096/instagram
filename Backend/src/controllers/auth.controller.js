const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt  = require("jsonwebtoken")




async function registerUser(req, res) {
    const { email, username, password, bio, profileImage } = req.body

    const isUserAlreadyExists = await userModel.findOne({ 
        $or: [
            {email},
            {username}
        ]
    })

    if (isUserAlreadyExists) { 
        return res.status(409).json({
            message: "user already exists"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({ 
        username,
        email,
        bio,
        profileImage,
        password:hash
    })

    const token = jwt.sign({
        id: user._id, 
        username: user.username
    }, process.env.JWT_SECRET , {expiresIn: "1d"})
    
    res.cookie("token" , token)
    
    res.status(201).json({
        message: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

     async function loginUser(req, res) {
    const { email, username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            {email},
            {username}
        ]
    }).select("+password")

    if(!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordCorrect = hash === user.password

    if(!isPasswordCorrect) { 
        return res.status(401).json({
            message: "invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id, 
        username: user.username
    }, process.env.JWT_SECRET , {expiresIn: "1d"})
    
    res.cookie("token" , token)
    
    res.status(200).json({
        message: "login successful",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


module.exports = {
    registerUser,
    loginUser
}