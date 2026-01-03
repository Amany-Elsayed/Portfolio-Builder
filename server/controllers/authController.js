const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, username, password} = req.body

    if(!name || !email || !username || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const userExists = await User.findOne({ email })
    if(userExists) {
        throw new ApiError(400, "User already exists")
    }

    const user = await User.create({ name, email, username, password })
    res.status(201).json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    })
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required")
    }

    const user = await User.findOne({ email })

    if (!user || !(await user.matchPassword(password))) {
        throw new ApiError(401, "Invalid email or password")
    }

    res.json({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        token: generateToken(user._id)
    })
})

module.exports = { registerUser, loginUser }