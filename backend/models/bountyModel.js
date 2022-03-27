const mongoose = require('mongoose')

const bountySchema = mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    },
    commonality:{
        type: String,
        enum: ['common', 'rare', 'unique'],
    },
    isGeoFixed: {
        type: Boolean,
    },  // if TRUE the Bounty is in a fixed geo-locatable location
    location: {
        type: { type: String },
        coordinates: [Number],
    },
    geofence: {
        type: String 
    },
    isMultiple: {
        type: Boolean
    }, // if TRUE the Bounty can be submitted multiple times in a hunt (i.e., find three of these)
    submissionType:{
        type: String,
        enum: ['text', 'photo', 'video', 'selfie', 'mascot-selfie'],
    },
    pointValue: {
        type: Number,
        required: true,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0
    },
    ageFilter: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Bounty', bountySchema)