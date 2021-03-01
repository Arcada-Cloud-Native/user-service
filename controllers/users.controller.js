const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users.model");
const { isOwner } = require("../middleware/auth");

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
        const user = await User.findOne({ _id: id });

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

        const query = { _id: id };
        const update = { $set: req.body };

        const user = await User.updateOne(query, update);
        res.status(200).json({ message: "User updated" });
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
        const user = await User.deleteOne({ _id: id });

        res.status(200).json({ message: "User deleted", user });
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
exports.userLogin = async (req, res, next) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email }).select(
            "+password"
        );
        if (!user)
            res.status(401).json({ message: "Email or password is wrong" });

        // Check password
        const validPass = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPass) {
            return res
                .status(401)
                .json({ message: "Email or password is wrong" });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.set("Authorization", token);
        res.status(200).json({ message: "Auth successfull", token });
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};

// @desc    User Logout
// @route   GET /api/users/logout
// @access  Protected
exports.userLogout = async (req, res, next) => {
    try {
        res.removeHeader("Authorization");
        res.send("Logged out");
    } catch (err) {
        const error = new Error(err);
        error.status = err.status || 500;
        next(error);
    }
};
