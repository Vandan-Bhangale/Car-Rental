const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");

exports.postSignup = async (req, res) => {
  const { name, email, password, confirmPassword, userType } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePic = `https://ui-avatars.com/api/?name=${name}&background=0D8ABC&color=fff`;
    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      userType,
      profilePic,
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

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //Store user in session
    req.session.user = {
      id: existingUser._id,
      email: existingUser.email,
      userType: existingUser.userType,
    };

    req.session.isLoggedIn = true; //Storing user loggedIn status in session
    req.session.userId = existingUser._id; //LoggedIn user Id in sesssion

    req.session.save((error) => {
      if (error) {
        console.log("Error while storing the session: ", error);
        res.status(500).json({ message: "Session save error" });
      }

      //* Sending user data in response
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          userType: existingUser.userType,
        },
      });
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//* Getting status of user whether user is loggedIn or not
exports.getStatus = (req, res) => {
  const user = req.session.user;
  if (user) {
    res.status(200).json({ isLoggedIn: true, user: user });
  } else {
    res.status(200).json({ isLoggedIn: false });
  }
};

exports.postLogout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error while logging out:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.status(200).json({ message: "Logout successful" });
  });
};

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    const googleClientId = process.env.GOOGLE_CLIENT_ID;

    if (!googleClientId) {
      return res
        .status(500)
        .json({ message: "Google Client ID is not configured on the server." });
    }

    const client = new OAuth2Client(googleClientId);

    // ✅ verify token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleClientId,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    // ✅ check user
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        password: null, // optional
        userType: "guest",
        authProvider: "google",
      });
    }

    req.session.user = {
      id: user._id,
      email: user.email,
      userType: user.userType,
    };

    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    req.session.save((error) => {
      if (error) {
        console.log("Error while storing the session: ", error);
        return res.status(500).json({ message: "Session save error" });
      }
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        authProvider:user.authProvider      //! Need Review
      },
    });
  } catch (err) {
    console.log("Error while Google login:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
