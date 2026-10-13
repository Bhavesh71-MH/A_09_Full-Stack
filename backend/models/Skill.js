
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Skill", skillSchema);