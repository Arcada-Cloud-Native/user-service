const route = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

const { checkAuth } = require("../middleware/auth");
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    userSignup,
    userLogout,
} = require("../controllers/users.controller");

// Routes(GET, POST, PUT, DELETE)
// Public
route.get("/", getAllUsers);
route.get("/:id", getUserById);
// Protected
route.patch("/:id", checkAuth, updateUser);
route.delete("/:id", checkAuth, deleteUser);
route.get("/logout", checkAuth, userLogout);

route.post("/signup", userSignup);

route.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                res.status(401).json({
                    message: "Authentication failed",
                });
            } else {
                bcrypt.compare(
                    req.body.password,
                    user[0].password,
                    (err, result) => {
                        if (err) {
                            return res.status(401).json({
                                message: "Authentication failed",
                            });
                        } else if (result) {
                            // Generera en JWT för användaren
                            const token = jwt.sign(
                                {
                                    email: user[0].email,
                                    userId: user[0]._id,
                                },
                                "Secret",
                                { expiresIn: "1h" }
                            );

                            return res.status(200).json({
                                message: "Authentication Successful",
                                token: token,
                            });
                        } else {
                            res.status(200).json({
                                message: "Authentication failed",
                            });
                        }
                    }
                );
            }
        })
        .catch();
});

module.exports = route;
