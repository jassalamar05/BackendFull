const mongoose = require("mongoose");

const uSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      minLength: [2, "min Length is required"],
    },
    pass: {
      type: String,
      required: [true, "passowrd is required"],
      minLength: [1, "min lenght shuld be 1"],
    },
  },
  {
    timestamps: true,
  },
);
const Uir = mongoose.model("uir", uSchema);
module.exports = Uir;
