const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    todo: {
      type: String,
      trim: true,
      required: true,
    },
    picked: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);
module.exports = mongoose.model("Todo", todoSchema);
