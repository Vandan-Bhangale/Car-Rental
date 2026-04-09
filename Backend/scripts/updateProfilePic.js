const mongoose = require("mongoose");
const User = require("../Models/userModel"); // adjust path if needed
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

// connect DB
const mongodbURI = process.env.MONGODB_URI;
console.log('MongoDB URL: ',mongodbURI);

mongoose.connect(mongodbURI)
.then(() => console.log('Connected to mongodb'))
.catch((err) => console.log('Error while connecting to DB: ',err));

const updateUsers = async () => {
  try {
    const users = await User.find({
      $or: [
        { profilePic: { $exists: false } },
        { profilePic: "" },
        { profilePic: null }
      ]
    });

    console.log(`Found ${users.length} users to update`);

    for (let user of users) {
      const profilePic = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0D8ABC&color=fff`;

      user.profilePic = profilePic;
      await user.save();
    }

    console.log("✅ All users updated successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

updateUsers();