const User = require("../models/user.model.js");


async function handleGetUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ error: error.message });
    }
}

async function handleCreateUser(req, res) {
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
}

async function handleGetUserById(req, res) {
    try {
        const userId = await req.params.id;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({
            message: 'User retrieved successfully',
            user
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message })
    }
}

async function handleUpdateUser(req, res) {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: error.message });
    }
}

async function handleDeleteUser(req, res) {
     try {
        const userId = req.params.id;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            user: deletedUser
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    handleGetUsers,
    handleCreateUser,
    handleGetUserById,
    handleUpdateUser,
    handleDeleteUser
};