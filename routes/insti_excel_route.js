const express = require("express");
const router = express.Router();
const {
  createVolAdmin,
  getAllVolAdmin,
  deleteVolAdmin,
} = require("../controllers/inadmin_controller");

router.post("/create/", createVolAdmin);
router.get("/all/", getAllVolAdmin);
router.post("/delete/", deleteVolAdmin);

module.exports = router;
