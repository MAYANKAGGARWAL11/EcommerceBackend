const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce1");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    variants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Variant' }],
  });
module.exports = mongoose.model('Product', productSchema);