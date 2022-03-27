const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }],
    name:
    {
        type: String,
        unique: true,
        required: [true, 'Please add team name'],
    },
    description:
    {
        type: String,
        required: [true, 'Please add team description'],
    },
    avatar:
    {
        type: String,
    },
},
{
    timestamps: true,
})

module.exports = mongoose.model('Team', teamSchema)