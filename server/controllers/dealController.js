const Deal = require("../models/Deal");

exports.getAllDeals = async (req, res) => {
  const deals = await Deal.find();
  res.json(deals);
};

exports.getDealById = async (req, res) => {
  const deal = await Deal.findById(req.params.id);
  if (!deal)
    return res.status(404).json({ message: "Deal not found" });

  res.json(deal);
};
