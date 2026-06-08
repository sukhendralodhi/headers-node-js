const express = require('express');
const { handleGenerateShortUrl, handleGetRoute, handleAnalytics, handleGetAllUrls } = require('../controllers/url.controller.js');
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleGetRoute);
router.get('/analytics/:shortId', handleAnalytics);
router.get('/', handleGetAllUrls);

// health check route
router.get('/health', async (req, res) => {
    console.log("hello from health route")
    return res.status(200).json({ message: 'URL service is healthy' });
});

module.exports = router;