const express = require('express');
const router = express.Router();
const User = require('../Models/UserSchema'); 
const bcrypt = require('bcrypt');

// User Registration
router.post('/register', async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: bcrypt.hashSync(req.body.password, 10),
            skill: req.body.skill,
            dob: req.body.dob,
            address: req.body.address,
            phoneno: req.body.phoneno,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            linkedin: req.body.linkedin,
        });

        const savedUser = await user.save();
        res.status(201).json({ success: true, message: 'User registered successfully', user: savedUser });
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ success: false, message: 'Error registering user', error: err.message });
    }
});

// User Login 
router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).json({ success: false, message: "Email does not exist" });
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
      
        const userResponse = {
            _id: user._id,
            name: user.name,
            email: user.email,
            skill: user.skill,
            dob: user.dob,
            address: user.address,
            phoneno: user.phoneno,
            city: user.city,
            state: user.state,
            country: user.country,
            linkedin: user.linkedin
        };

        res.status(200).json({ success: true, user: userResponse });
    } else {
        res.status(400).json({ success: false, message: "Password Incorrect" });
    }
});

module.exports = router;
