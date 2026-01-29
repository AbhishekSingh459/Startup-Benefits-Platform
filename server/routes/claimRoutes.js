const express = require("express");
const {claimDeal,getUserClaims} = require("../controllers/claimController.js");
const protect = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/", protect, claimDeal);
router.get("/user", protect, getUserClaims);

module.exports = router;
