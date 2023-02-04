const mongoose = require('mongoose');

const authSchema = new mongoose.Schema(
    {
        user: {
            type: {
                id: {
                    type: String
                },
                email: {
                    type: String
                }
            }
        },
        token: {
            type: String
        },
        isExpired: {
            type: Boolean,
            default: false
        },
        expireAt: {
            type: Date
        },
        lastAccess: {
            type: Date
        }
    },
    { timestamps: true }
);

const Auth = mongoose.model('auth', authSchema);

module.exports = Auth;