const mongoose = require('mongoose')

const captureSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Team'
    },
    hunt: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Hunt'
    },
    bounty: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Bounty'
    },
    response:{
        photo: String,
        text: String,
        multiple: []
    },
    description: {
        type: String,
    },
    location: {
        type: { type: String },
        coordinates: [Number],
    }, // GeoJSON
},
{
    timestamps: true,
})

module.exports = mongoose.model('Capture', captureSchema)