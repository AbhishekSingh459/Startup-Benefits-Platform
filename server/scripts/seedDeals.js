const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const Deal = require("../models/Deal");

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const deals = [
  {
    partnerName: "AWS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1280px-Amazon_Web_Services_Logo.svg.png",
    title: "$5,000 Activate Credits",
    description: "Build and scale with free cloud credits and technical support.",
    category: "Cloud",
    value: "$5,000",
    fullDetails: "Get $5,000 in AWS Activate credits valid for 2 years.",
    eligibility: "Early-stage startups",
    instructions: "Apply using your code",
  },
  {
    partnerName: "Stripe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png",
    title: "$20,000 Fee-free Processing",
    description: "Skip transaction fees for your first $20,000.",
    category: "Finance",
    value: "$20,000",
    fullDetails: "No fees on first $20k",
    eligibility: "New Stripe users",
    instructions: "Claim to generate referral",
  },
  {
    partnerName: "HubSpot",
    logo: "https://1000logos.net/wp-content/uploads/2022/12/HubSpot-Logo-2006.png",
    title: "90% off for Startups",
    description: "CRM at massive discount",
    category: "Marketing",
    value: "90% Off",
    fullDetails: "90% first year",
    eligibility: "Venture-backed startups",
    instructions: "Verify startup",
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Deal.deleteMany();
    await Deal.insertMany(deals);
    console.log("Deals seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
