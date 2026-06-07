const express = require('express');
const User = require('../models/user.model.js');
const router = express.Router();
const { handleGetUsers, handleCreateUser, handleGetUserById, handleUpdateUser, handleDeleteUser } = require('../controllers/user.controller.js');

// user route 
router.route('/')
    .get(handleGetUsers)
    .post(handleCreateUser);

// group router
router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUser)
    .delete(handleDeleteUser);

module.exports = router;