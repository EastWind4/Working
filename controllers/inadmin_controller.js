const Excel = require("../models/inadmin.js");
const User = require("../models/users.js");

const createVolAdmin = async (req, res) => {
  const { name, sheetData, filename } = req.body;
  const check = User.findOne({ name: name });
  if (!check) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  if (check.tyoe !== "INSTITUTION") {
    res.status(400).json({
      message: "User not an Institution",
    });
    return;
  }
  try {
    const inAdmin = await Excel.create({
      name,
      email: check.email,
      sheetData,
      fileName: filename,
    });
    await inAdmin.save();
    res.status(200).json({
      message: "Excel Submitted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllVolAdmin = async (req, res) => {
  const all = await Excel.find({});
  res.status(200).json({
    message: "All Excel Fetched",
    excel: all,
  });
}

const deleteVolAdmin = async (req, res) => {
  const { id } = req.body;
  try {
    await Excel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Excel Deleted",
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
