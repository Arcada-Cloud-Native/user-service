const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        const { id } = req.params;
        const user = await User.findById(id);

        res.status(200).json(user);
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Update user
// @route   PATCH /api/users/:id
// @access  Protected
exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const owner = await User.findById(id);

        isOwner(owner._id);

        const user = await User.update(
            { _id: req.params.id },
            { $set: req.body }
        );
        return res.status(200).json({ message: "User updated", user });
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Protected
exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const owner = await User.findById(id);

        isOwner(owner._id);

        const user = await User.remove({ _id: id });
        return res.status(200).json({ message: "User deleted" });
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    Register user
// @route   POST /api/users/signup
// @access  Public
exports.userSignup = async (req, res, next) => {
    try {
        const { name, address, email, password } = req.body;
        // Check if user exists
        const emailExists = await User.findOne({ email });
        if (emailExists)
            return res.status(400).json({ message: "User already exists" });

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                res.status(500).json({
                    message: err,
                });
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    address,
                    email,
                    password: hash,
                });

                const savedUser = await user.save();
                res.status(201).json({ message: "User registered" });
            }
        });
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

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
