const express = require("express");
const {getAllDeals, getDealById} = require("../controllers/dealController");

const router = express.Router();

router.get("/", getAllDeals);
router.get("/:id", getDealById);

module.exports = router;
