const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const protect = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error:"Unauthorized - No token provide."});
        }

        const decode = jwt.verify(token,process.env.JWT_SECRET);

        if(!decode) {
            return res.status(401).json({error:"Unauthorized - No token provide."});
        }

        const user = await userModel.findById(decode.userId);
        if(!user) {
            return res.status(400).json({message:"User not found."});
        }

        req.user = user;
        next();
    } catch (err) {
        console.log('Error in protect middleware: ',err);
        return res.status(500).json({message:"Internal server error."});
    }
}

module.exports = protect;