const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');

exports.postLogin =async (req,res) => {
    try {
        const {email,password} = req.body;

        const existingUser = await User.findOne({email});

        if(!existingUser) {
            return res.status(404).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }

        if(existingUser) {
            return res.status(200).json({message: "Login successful"});
        }
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.postSignup = async (req, res) => {
    const {name,email,password,confirmPassword} = req.body;

    if(password !== confirmPassword) {
        return res.status(400).json({message: "Passwords do not match"});
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({message: "User registered successfully"});
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({message: "Internal server error"});
    }
}
