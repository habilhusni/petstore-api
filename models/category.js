const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  catagorySchema = new Schema({
    Id: { type: String, required: true, unique: true },
    Name: { type: String, unique: true },
    Photos: [{ type: String }],
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
