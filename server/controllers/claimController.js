const Claim = require("../models/Claim.js");
const Deal = require("../models/Deal.js");
const User = require("../models/User.js");

exports.claimDeal = async (req, res) => {
  const { dealId } = req.body;

  const deal = await Deal.findById(dealId);
  if (!deal)
    return res.status(404).json({ message: "Deal not found" });

  const user = await User.findById(req.user.id);

  if (deal.isLocked && !user.isVerified)
    return res.status(403).json({ message: "Verification required" });

  const existingClaim = await Claim.findOne({
    userId: user._id,
    dealId: deal._id
  });

  if (existingClaim)
    return res.status(400).json({ message: "Deal already claimed" });

  const claim = await Claim.create({
    userId: user._id,
    dealId: deal._id,
    status: "pending"
  });

  res.status(201).json(claim);
};

exports.getUserClaims = async (req, res) => {
  const claims = await Claim.find({ userId: req.user.id }).populate("dealId");
  res.json(claims);
};
