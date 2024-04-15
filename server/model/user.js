const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide your First Name"],
        maxLength: [30, "Name cannot exceed 30 character"],
        minLength: [4, "Name must have more than 4 character"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please provide your Email"],
        validate: [validator.isEmail, "Invalid Email"],
    },
    password: {
        type: String,
        required: [true, "Please provide a Password"],
        minLength: [8, "Password must be greater than 8 characters"],
        select: false, //whenever find method is called
    },
    tasks: [
        {
            task: {
                type: String,
                required: true
            },
            status: {
                type: Boolean,
                default:true,
            },
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("user", userSchema);
