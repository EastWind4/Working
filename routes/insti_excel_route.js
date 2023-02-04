const express = require("express");
const router = express.Router();
const {
  createVolAdmin,
  getAllVolAdmin,
  deleteVolAdmin,
  getAllVolInsti
} = require("../controllers/inadmin_controller");

router.post("/create/", createVolAdmin);
router.post("/all/", getAllVolAdmin);
router.post("/all/in/", getAllVolInsti);
router.post("/delete/", deleteVolAdmin);

module.exports = router;
