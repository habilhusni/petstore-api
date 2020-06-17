const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    Id: { type: String, required: true, unique: true },
    Name: { type: String, required: true, unique: true },
    Email: { type: String, unique: true },
    is_Admin: { type: Boolean },
    Password: { type: String, required: true },
  }),
  User = mongoose.model("User", userSchema);

module.exports = User;
