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

        //Store user in session
        req.session.user = {
            id: existingUser._id,
            email: existingUser.email,
            userType: existingUser.userType
        };

        req.session.isLoggedIn = true;
        req.session.userId = existingUser._id;

        req.session.save((error) => {
            if(error) {
                console.log("Error while storing the session: ",error);
                res.status(500).json({message: "Session save error"});
            }
            return res.status(200)
            .json({
                message: "Login successful",
                user: {
                    id: existingUser._id.toString(),
                    email: existingUser.email,
                    userType: existingUser.userType
                }
            });
        });
    } catch (error) {
        console.error("Error while logging in:", error);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.getStatus = (req, res) => {
    const user = req.session.user;
    if(user) {
        res.status(200).json({isLoggedIn: true, user: user});
    } else {
        res.status(200).json({isLoggedIn: false});
    }
}

exports.postLogout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error("Error while logging out:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.status(200).json({ message: "Logout successful" }); 
    });
}

exports.postSignup = async (req, res) => {
    const { name, email, password, confirmPassword, userType } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            userType,
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);

        // Handle duplicate email error (MongoDB error code 11000)
        if (error.code === 11000) {
            return res.status(400).json({ message: "Email already registered" });
        }

        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getProfile = async (req,res) => {
    try{
        const id = req.session.userId;
        const user = await User.findById(id);
        if(user) {
            res.status(200).json({
                name: user.name,
                email: user.email
            })
        } else {
           return res.status(400).json({message: "User data not found"});
        }
    } catch (err) {
        res.status(500).json({message:"Server error",err});
    }
}

exports.updateProfile = async (req,res) => {
    try {
        const id = req.session.userId;
        const updateData = req.body;
        const updatedUser = await User.findByIdAndUpdate(id,updateData,{new:true});
        if(!updatedUser) {
            return res.status(400).json({message:"User not found"});
        }
        res.status(200).json({message:"Update Successfull",user: updatedUser});
    } catch (err) {
        return res.status(500).json({message:"Server Error",err});
    }
}

exports.deleteProfile = async (req,res) => {
    try {
        const id = req.session.userId;
        const deleteUser = await User.findByIdAndDelete(id);
        req.session.destroy((err) => {
            if(err) {
                return res.status(500).json({message:"Error while deleting user session."});
            }
            res.status(200).json({message: "Session destroyed successfully"});
        });

        if(!deleteUser) {
            return res.status(400).json({message : "User not found"});
        } 
        res.status(200).json({message: "Profile deleted sucssfully"});
    } catch (err) {
        return res.status(500).json({message:"Server error",err});
    }
}