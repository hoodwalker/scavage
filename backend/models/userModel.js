const mongoose = require('mongoose')
const { isEmail } = require('validator')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: [isEmail, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: [6, 'Please use a password at least six characters long']
    }
},
{timestamps: true}
)

module.exports = mongoose.model('User', userSchema)