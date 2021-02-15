const mongoose = require("mongoose");

const User = require("../models/users.model");

// @desc    Get All Users
// @route   GET /api/users
// @access  Public
exports.getAllusers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public

// @desc    User Login
// @route   POST /api/users
// @access  Public

// @desc    User Logout
// @route   GET /api/users/logout
// @access  Secure
