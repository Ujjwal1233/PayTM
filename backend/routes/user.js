const express = require('express')
const zod = require('zod');
const { User, Account } = require('../db')
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(8)
})

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            msg: "Incorrect Inputs"
        })
    }
    const existingUser = await User.findOne({
        username: req.body.username
    })
    if (existingUser) {
        return res.status(403).json({
            msg: "Credentials already taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    })

    const userId = user._id;

    // ----- created new account -------- 
    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    // ------------------------------------

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({
        msg: "User created successfully",
        token: token
    })
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
        return res.status(403).json({
            mgs: "Incorrect Inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.status(200).json({
            token: token
        })
        return;
    }
    res.status(411).json({
        msg: "error while loggging in"
    })
})

const updateBody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.status(200).json({
        msg: "Updated Successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.status(200).json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get("/profile", authMiddleware, async (req, res) => {
    const user = await User.findOne({
        _id: req.userId
    })
    res.json({
        user: user
    })
})

module.exports = router;
