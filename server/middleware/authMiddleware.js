const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const User = require('../models/User')

const protect = asyncHandler(async (req, res, next) => {
    let token = req.headers.authorization

    if(token && token.startsWith("Bearer")) {
        token = token.split(" ")[1]

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = await User.findById(decoded.id).select('-password')

        if (!req.user) {
            throw new ApiError(401, "User not found")
        }

        next()
    } else {
        throw new ApiError(401, "Not authorized, no token")
    }
})

module.exports = { protect }