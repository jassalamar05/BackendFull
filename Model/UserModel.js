const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
            minLength: [2, "min name"],
            unique: true
        },

        age: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("user", UserSchema);
module.exports=User
