const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  petSchema = new Schema({
    Id: Schema.ObjectId,
    Name: { type: String, required: true },
    Age: { type: Number, required: true },
    Photo: { type: String, required: true },
  }),
  Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;
