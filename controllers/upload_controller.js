const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Image = require('../models/images');
const fs = require('fs');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// // multer config
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'SPIT-Hackathon',
//     allowedFormats: ['jpg', 'png', 'jpeg'],
//   },
// });

// const upload = multer({ storage: storage });


// upload image with userId as name

const uploadImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const file = req.file;
    if (!file) {
      res.status(400).json({
        message: 'No file uploaded',
      });
      return;
    }
    const { path } = file;
    const { secure_url } = await cloudinary.uploader.upload(path, {
      public_id: "test/uploads/"+userId,
    });
    const image = new Image({
      userId: userId,
      imageUrl: secure_url,
    });
    await image.save();
    const pt=`uploads/${file.fieldname + '-' + file.originalname}`;
    fs.unlinkSync(pt);
    res.status(200).json({
      message: 'Image uploaded successfully',
      image: secure_url,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const getImage = async (req, res) => {
  try {
    const { userId } = req.body;
    const img = await Image.findOne({ userId: userId });
    if (!img) {
      res.status(404).json({
        message: 'Image not found',
      });
      return;
    }
    res.status(200).json({
      message: 'Image found',
      image: img.imageUrl,
    });

  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { userId } = req.body;
    await Image.findOneAndDelete({ userId: userId });
    await cloudinary.uploader.destroy("test/uploads/"+userId);
    res.status(200).json({
      message: 'Image deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};





module.exports = {uploadImage, getImage, deleteImage};
