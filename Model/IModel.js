const mongoose = require("mongoose");

const iSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const IUser = mongoose.model("Iuser", iSchema);
module.exports = { IUser };
