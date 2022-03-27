const mongoose = require('mongoose')

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    firstName: {
        type: String,
        required: [true, 'Please add text value'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add text value'],
    },
    avatar: {
        type: String,
    },
    birthYear: {
        type: Number,
        required: true,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    zipcode: {
        type: String,
        required: true
    },
    participationPoints: {
        type: Number,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
    scavagePoints : {
        type: Number,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Profile', profileSchema)