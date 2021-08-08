const mongoose = require("mongoose");

const StaffSchema = new mongoose.Schema({
  personalTitle: { type: String, required: true, enum: ["Mr", "Ms"] },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    trim: true,
  },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  //   assuming comapany's stand is in support for non binary community, gender schema isnt limited to M and F
  address: { type: String, required: true, maxLength: 180 },
  position: { type: String, required: true },
});

module.exports = mongoose.model("Staff", StaffSchema);
