const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    Id: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Email: { type: String },
    is_Admin: { type: Boolean },
    Password: { type: String, required: true },
  }),
  User = mongoose.model("User", userSchema);

module.exports = User;
