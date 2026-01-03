const mongoose = require('mongoose')

const portfolioSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    profileImage: {
    type: String,
    },
    headline: String,
    summary: String,
    skills: [String],
    projects: [
    {
        title: String,
        description: String,
        technologies: [String],
        projectImages: [String],
        githubLink: String,
        liveDemo: String,
    },
    ],
    socialLinks: {
        github: String,
        linkedin: String,
        website: String,
    },
    isPublic: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

const Portfolio = mongoose.model('Portfolio', portfolioSchema)
module.exports = Portfolio