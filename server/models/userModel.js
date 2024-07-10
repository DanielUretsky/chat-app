const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required!']
    },
    lastName: {
        type: String, 
        required: [true, 'Last name is required!']
    },
    username: { 
        type: String,
        required: [true, 'Username is required!'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'Phone is required!'],
        match: [/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required!']
    },
    gender: {
        type: String,
        required: [true, 'Gender is required!']
    },
    image: {
        type: String,
        default: null
    }
}, {
    versionKey: false,
    strict: 'throw'
});

const User = mongoose.model("user", userSchema, "users");

module.exports = User;