const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  catagorySchema = new Schema({
    Name: { type: String, unique: true },
    Products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    Brands: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
      },
    ],
  }),
  Category = mongoose.model("Category", catagorySchema);

module.exports = Category;
