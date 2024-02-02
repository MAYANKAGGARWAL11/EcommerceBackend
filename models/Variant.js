const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    SKU: { type: String },
    additionalCost: { type: Number, default: 0 },
    stockCount: { type: Number, default: 0 },
  });
  
module.exports = mongoose.model('Variant', variantSchema);