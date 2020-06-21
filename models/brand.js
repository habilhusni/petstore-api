const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  brandSchema = new Schema({
    Id: { type: String, required: true, unique: true },
    Name: { type: String, unique: true },
    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    Categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  }),
  Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
