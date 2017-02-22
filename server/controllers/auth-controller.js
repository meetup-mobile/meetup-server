"use strict";

const User = require("../models/user");
const passport = require("passport");
const encryption = require("../utils/encryption");
const config = require("../config");
const jwt = require('jwt-simple');

function getToken(headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = () => {
    return {
        registerUser(req, res) {
            let body = req.body;

            User.findOne({ username: body.username }, (err, user) => {
                if (err) {
                    res.json(err);
                    return;
                }

                if (user) {
                    return res.json("{\"error\": \"Username already exists\"}");                
                }
                
                User.create(body, (error, newUser) => {
                    if (error) {
                        return res.json(error);
                    }

                    let result = {
                            username: newUser.username,
                            _id: newUser._id
                    };

                    return res.json({ result });
                });
            })
        },
        loginUser(req, res, next) {
            User.findOne({ username: req.body.username, passHash: req.body.passHash }, (err, user) => {
                if (err) {
                    throw err;
                }

                if (!user) {
                    let error = {
                        errorMessage: "Invalid username or password."
                    }

                    return res.sendStatus(404).json({ error });
                } else {
                    let result = {
                        username: user.username,
                        _id: user._id
                    };

                    return res.sendStatus(200).json({ result });
                }
            });
        },
        logoutUser(req, res) {
            req.logout();
            res.sendStatus(200);
        }
    };
};