const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  productSchema = new Schema({
    Name: { type: String, unique: true },
    Pictures: [String],
    Price: { type: String },
    Description: { type: String },
    PetType: { type: String },
    Brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],
    Categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  }),
  Product = mongoose.model("Product", productSchema);

module.exports = Product;
