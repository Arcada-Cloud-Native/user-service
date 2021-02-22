const mongoose = require("mongoose");

const User = require("../models/users.model");

// @desc    Get All Users
// @route   GET /api/users
// @access  Public
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Public
exports.getUserById = async (req, res, next) => {
    try {
    } catch (err) {}
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Protected
exports.updateUser = async (req, res, next) => {};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Protected

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public

// @desc    User Login
// @route   POST /api/users
// @access  Public

// @desc    User Logout
// @route   GET /api/users/logout
// @access  Protected
exports.userLogout = async (req, res, next) => {
    try {
        req.removeHeader("Authorization");
        next();
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};
