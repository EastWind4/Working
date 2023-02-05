const VolAdmin = require('../models/voladmin.js');
const User = require('../models/users.js');

const createVolAdmin = async (req, res) => {
  const {name, email, sheetData, filename} = req.body;
  try {
    const volAdmin = await VolAdmin.create({
      name,
      email,
      sheetData,
      fileName: filename,
    });
    await volAdmin.save();
    let user = await User.findOne({email: email});
    let count = Math.floor(sheetData.length/10);
    let temp = parseInt(user.hours)
    user.hours = count+temp;
    await user.save();
    res.status(200).json({
      message: 'Excel Submitted',
    }); 
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

const getAllVolAdmin = async (req, res) => {
  const all = await VolAdmin.find({});
  res.status(200).json({
    message: 'All Excel Fetched',
    excel: all,
  });
}

const deleteVolAdmin = async (req, res) => {
  const {id} = req.body;
  try {
    await VolAdmin.findByIdAndDelete(id);
    res.status(200).json({
      message: 'Excel Deleted',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
}

module.exports = {
  createVolAdmin,
  getAllVolAdmin,
  deleteVolAdmin,
};
