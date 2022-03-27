const mongoose = require('mongoose')

const huntSchema = mongoose.Schema({
    bounties: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bounty'
    }],
    authorizedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'    
    }],
    title:
    {
        type: String,
        required: [true, 'Provide a title for this hunt'],
    },
    description:
    {
        type: String,
        required: [true, 'Provide a description of this hunt'],
    },
    type:{
        type: String,
        enum: ['casual', 'competitive', 'geolocated', 'time-constrained', 'open-ended'],
        default: 'casual'
    }, 
    isActive: {
        type: Boolean,
        required: true,
        default: false
    },
    isComplete: {
        type: Boolean,
        required: true,
        default: false
    },
    scavagePoints: {
        type: Number,
        integer: true,
        get: v => Math.round(v),
        set: v => Math.round(v),
        default: 0
    },
    timeConstraint: {
        beginDatetime: Date,
        endDatetime: Date,
    },
    locationShape: {
        type: { type: String },
        coordinates: [Number],
    }, // GeoJSON
    sequential: {
        type: Boolean,
        required: true,
        default: false
    }, // if TRUE Bounty must be captured in order
    hidden: {
        type: Boolean,
        required: true,
        default: false
    },  // if TRUE Bounty is revealed to scav one item at a time
    numberHidden: {
        type: Boolean,
        required: true,
        default: false
    }, // if TRUE the number of items on the list is not revealed to the scav
    autoApprove: {
        type: Boolean,
        required: true,
        default: true
    }, // if TRUE no judge review is required to accept captures
    completionMessage: String, // the message for all scavs who complete the hunt
    prize: String // the message for the winner of the hunt
},
{
    timestamps: true,
})

module.exports = mongoose.model('Hunt', huntSchema)