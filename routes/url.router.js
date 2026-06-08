const express = require('express');
const { handleGenerateShortUrl, handleGetRoute, handleAnalytics, handleGetAllUrls } = require('../controllers/url.controller.js');
const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/health', async (req, res) => {
    console.log("hello from health route")
    return res.status(200).json({ message: 'URL service is healthy' });
});
router.get('/analytics/:shortId', handleAnalytics);
router.get('/:shortId', handleGetRoute);
router.get('/', handleGetAllUrls);

module.exports = router;