const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydb1')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// schema 
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    jobTitle: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    }
}, { timestamps: true });


const User = mongoose.model('User', userSchema);

app.post('/users', async (req, res) => {
    try {
        const body = req.body;
        if (!body.firstName || !body.email) {
            return res.status(400).json({ error: 'firstName and email are required' });
        }

        // check if email already exists
        const existingUser = await User.findOne({ email: body.email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const user = await User.create(
            {
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email,
                gender: body.gender,
                jobTitle: body.jobTitle,
            }
        );
        res.status(201).json({
            message: 'User created successfully',
            user: user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(
            {
                message: 'Users retrieved successfully',
                users: users
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});