const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            match: [
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
                'Please enter a valid email address'
            ]
        },
        password: {
            type: String,
            trim: true
        },
        type: {
            type: String,
            enum: ['ADMIN', 'VOLUNTEER', 'INSTITUTION'],
            required: true
        },
        profilePic: {
            type: String,
            default:""
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
        isActivated: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

const User = mongoose.model('users', userSchema);

module.exports = User;
