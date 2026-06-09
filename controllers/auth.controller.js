const Auth = require("../models/auth.model");
const { v4: uuidv4 } = require('uuid');
const { setUser } = require("../service/auth.service.js");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Please provide name"
            });
        }
        if (!email) {
            return res.status(400).json({
                message: "Please provide emial"
            });
        }
        if (!password) {
            return res.status(400).json({
                message: "Please provide emial"
            });
        }

        const checkExistingUser = await Auth.findOne({ email });

        if (checkExistingUser) {
            return res.status(400).json({
                message: "Email already there please use another one"
            });
        }

        const newUser = await Auth.create({
            name,
            email,
            password
        });

        return res.redirect('home');

        // return res.status(200).json({
        //     message: "User Registred Successfully"
        // });

    } catch (error) {
        return res.status(500).json(
            {
                error: "internal server error"
            }
        );
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        if (!email) {
            return res.render('login', {
                error: 'Email is required',
            });
        }

        if (!password) {
            return res.render('login', {
                error: 'Password is required',
            });
        }

        const user = await Auth.findOne({
            email,
            password,
        });

        console.log(user);

        if (!user) {
            return res.render('login', {
                error: 'Invalid email or password',
            });
        }

        const sessionId = uuidv4();
        setUser(sessionId, user);
        res.cookie('uuid', sessionId);
        return res.redirect('/');

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: 'Internal server error',
        });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin
}