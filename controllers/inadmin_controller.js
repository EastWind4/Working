const Excel = require("../models/inadmin.js");
const User = require("../models/users.js");

const createVolAdmin = async (req, res) => {
  const { name, sheetData, filename, to } = req.body;
  const check = User.findOne({ name: name });
  if (!check) {
    res.status(400).json({
      message: "User not found",
    });
    return;
  }
  if (to === "INSTITUTION") {
    if (check.type !== "ADMIN") {
      res.status(400).json({
        message: "User not an Admin",
      });
      return;
    }
  }
  if (to === "ADMIN") {
    if (check.type !== "INSTITUTION") {
      res.status(400).json({
        message: "User not an Institution",
      });
      return;
    }
  }
  
  try {
    const inAdmin = await Excel.create({
      name,
      email: check.email,
      sheetData,
      fileName: filename,
      to,
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
  const { to } = req.body;
  const all = await Excel.find({ to: to });
  res.status(200).json({
    message: "All Excel Fetched",
    excel: all,
  });
};

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
};

module.exports = {
  createVolAdmin,
  getAllVolAdmin,
  deleteVolAdmin,
};
