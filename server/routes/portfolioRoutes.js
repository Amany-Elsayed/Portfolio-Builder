const express = require('express')
const { createOrUpdateProtfolio, getMyPortfolio, getPublicPortfolio, uploadProfileImage, uploadProjectImages } = require('../controllers/portfolioController')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/')
    .post(protect, createOrUpdateProtfolio)
    .put(protect, createOrUpdateProtfolio)
router.post('/upload-profile-image', protect, upload.single('image'), uploadProfileImage)
router.post('/projects/:projectId/images', protect, upload.array('images', 5), uploadProjectImages)
router.get('/me', protect, getMyPortfolio)
router.get('/:username', getPublicPortfolio)

module.exports = router