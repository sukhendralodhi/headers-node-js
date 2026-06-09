const express = require('express');
const { application } = require('express');
const URL = require('../models/url.model.js');

const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({});
    console.log(allUrls)
    return res.render('home', {
        error: "URL already exists",
        urls: allUrls,
    });
});

router.get('/signup', async (req, res) => {
    return res.render('signup');
});

router.get('/login', async (req, res) => {
    return res.render('login');
});

module.exports = router;