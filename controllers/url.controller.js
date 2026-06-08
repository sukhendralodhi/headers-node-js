const { nanoid } = require('nanoid');
const URL = require('../models/url.model.js');

async function handleGenerateShortUrl(req, res) {
    try {
        let { url } = req.body;

        if (!url) {
            return res.render('home', {
                error: 'URL is required',
            });
        }

        if (
            !url.startsWith('http://') &&
            !url.startsWith('https://')
        ) {
            url = `https://${url}`;
        }

        const checkRedirectUrl = await URL.findOne({
            redirectUrl: url,
        });

        if (checkRedirectUrl) {
            const allUrls = await URL.find({});

            return res.render('home', {
                error: 'URL already exists',
                urls: allUrls,
            });
        }

        const shortId = nanoid(8);

        await URL.create({
            shortId,
            redirectUrl: url,
            visitHistory: [],
        });

        const allUrls = await URL.find({});

        return res.render('home', {
            id: shortId,
            urls: allUrls,
            success: 'Short URL generated successfully',
        });

    } catch (error) {
        console.error(error);

        return res.render('home', {
            error: 'Internal server error',
        });
    }
}

async function handleGetRoute(req, res) {
    try {
        const shortId = req.params.shortId;
        console.log('Received shortId:', shortId); // Debug log to check the received shortId
        const entry = await URL.findOneAndUpdate(
            { shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            }
        );

        if (!entry) {
            return res.status(404).json({
                error: 'Short URL not found'
            });
        }

        console.log('Redirecting to:', entry.redirectUrl); // Debug log to check the redirect URL

        return res.redirect(entry.redirectUrl);

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

async function handleAnalytics(req, res) {
    try {
        const shortId = req.params.shortId;

        if (!shortId) {
            return res.status(400).json({
                error: "Short ID is required"
            })
        }

        const entry = await URL.findOne({ shortId });

        if (!entry) {
            return res.status(404).json({
                error: "Short URL not found"
            })
        }

        return res.render('analytics', {
            totalClicks: entry.visitHistory.length,
            analytics: entry
        });

        // return res.status(200).json({
        //     totalClicks: entry.visitHistory.length,
        //     analytics: entry
        // });

    } catch (error) {
        return res.status(500).json({
            error: 'Internal server error'
        });
    }
}

async function handleGetAllUrls(req, res) {
    try {
        const allUrls = await URL.find({});

        return res.status(200).json({
            length: allUrls.length,
            data: allUrls
        });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {
    handleGenerateShortUrl,
    handleGetRoute,
    handleAnalytics,
    handleGetAllUrls
};
