// Multer middleware with cloudinary to direct multer where to store image now it is cloudinary

const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./config/cloudinary'); // adjust path if needed

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,     //which account to use
  params: {
    folder: 'car-rental', // Cloudinary folder name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  },
});

const upload = multer({ storage });

module.exports = upload;

