const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError')
const Portfolio = require('../models/Portfolio')
const User = require('../models/User')

const createOrUpdateProtfolio = asyncHandler(async (req, res) => {
    const existingPortfolio = await Portfolio.findOne({
        user: req.user._id
    })

    if (existingPortfolio) {
        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { user: req.user._id },
            req.body,
            { new: true }
        )
        res.json(updatedPortfolio)
    } else {
        const newPortfolio = await Portfolio.create({
            user: req.user._id,
            ...req.body 
        })
        res.status(201).json(newPortfolio)
    }
})

const getMyPortfolio = asyncHandler(async (req, res) => {
    const portfolio = await Portfolio.findOne({
        user: req.user._id
    })

    if (!portfolio) {
        throw new ApiError(404, "Portfolio not found")
    }

    res.json(portfolio)
})

const getPublicPortfolio = asyncHandler(async (req, res) => {
    const user = await User.findOne({
        username: req.params.username
    })

    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const portfolio = await Portfolio.findOne({
        user: user._id,
        isPublic: true
    })

    if (!portfolio) {
        throw new ApiError(404, "Portfolio is not public or does not exist")
    }

    res.json(portfolio)
})

const uploadProfileImage = asyncHandler(async (req, res) => {
    const portfolio = await Portfolio.findOne({
        user: req.user._id
    })

    if (!portfolio) {
        throw new ApiError(404, "Portfolio not found")
    }

    if (!req.file) {
        throw new ApiError(400, "No image uploaded")
    }

    portfolio.profileImage = req.file.path
    await portfolio.save()

    res.status(200).json({
        message: "Profile image uploaded successfully",
        profileImage: req.file.path
    })
})

const uploadProjectImages = asyncHandler(async (req, res) => {
    const { projectId } = req.params

    const portfolio = await Portfolio.findOne({
        user: req.user._id
    })

    if (!portfolio) {
        throw new ApiError(404, "Portfolio not found")
    }

    const project = portfolio.projects.id(projectId)

    if (!project) {
        throw new ApiError(404, "Project not found")
    }

    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, "No images uploaded")
    }

    const imageUrls = req.files.map(file => file.path)

    project.projectImages.push(...imageUrls)
    await portfolio.save()

    res.status(200).json({
        message: "Project images uploaded successfully",
        images: imageUrls
    })
})



module.exports = { createOrUpdateProtfolio, getMyPortfolio, getPublicPortfolio, uploadProfileImage, uploadProjectImages }