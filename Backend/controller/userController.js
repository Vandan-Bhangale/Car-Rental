const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');

//* Getting user Profile to show in UI
exports.getProfile = async (req,res) => {
    try{
        const id = req.session.userId;
        const user = await User.findById(id);
        if(user) {
            res.status(200).json({
                name: user.name,
                email: user.email,
                authProvider:user.authProvider
            })
        } else {
           return res.status(400).json({message: "User data not found"});
        }
    } catch (err) {
        res.status(500).json({message:"Server error",err});
    }
}

// User can update the profile
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


// User can delete their profile
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

exports.switchRole = async (req,res) => {
    try {
        const userId = req.session.userId;

        const user = await User.findById(userId);
        if(!user) {
            return res.status(400).json({message:"User not found"});
        }

        if(user.authProvider !== "google") {
            return res.status(400).json({message:"Only for google auth user"});
        }

        user.userType = "owner";
        await user.save();

        req.session.user.userType = "owner";

        res.status(200).json({message:"Role switched successfully",success:true,user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          userType: user.userType,
        }});

    } catch (err) {
        console.log('Error while role switching: ',err);
        return res.status(500).json({message:"Internal server error"});
    }
}