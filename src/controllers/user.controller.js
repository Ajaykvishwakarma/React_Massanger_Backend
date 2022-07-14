const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

const User = require('../models/user.model');

require('dotenv').config();

const newToken = (user) => {
    const token = jwt.sign({ user}, process.env.JWT_SECRET_KEY);
    return token;
};

router.get("/", authenticate, async (req, res) => {
    const keyword = req.query.search ? {
            $or: [
                { name: {$regex: req.query.search, $option: "i"}},
                { email: {$regex: req.query.search, $option: "i"}},
            ]
        }
        : {};

        const users = await User.find(keyword).find({ _id: { $ne: req.user._id}});
        res.send(users);

});

router.post('/signup', async (req, res) => {
    try {
        let user = await User.create(req.body);
        let token = newToken(user);
        return res.status(200).send( { user, token});
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.get('/:id', async (req, res) => {
    try{
        let user = await User.find(req.params.id).lean().exec();
        return res.status(200).send(user);
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.delete('/', authenticate, async (req, res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(400).send(error.message)
    }
});
router.post('/login', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(400).send("Email Not Found!");
        }
        let match = user.checkPassword(req.body.password);
        if(!match) {
            return res.status(400).send("Wrong Password!");
        }
        let token = newToken(user)
        return res.status(200).send({ user, token});
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

module.exports = router;