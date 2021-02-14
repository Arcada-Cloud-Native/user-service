const route = require("express").Router();
const express = require('express');
const mongoose = require('mongoose');
//const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');


// Routes(GET, POST, PUT, DELETE)
route.get('/', (req, res, next) => {
    User.find().exec()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = error.status || 500;
            
            next(err);
        });
});

route.post('/signup', (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: err 
            });
        }  
        else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash 
            });
        
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: "User registered!"
                    });
                })
                .catch(error => {
                    console.log(error);
                    const err = new Error(error);
                    err.status = error.status || 500;
                    
                    next(err);
                });
        }    
    });
    
});

module.exports = route;
