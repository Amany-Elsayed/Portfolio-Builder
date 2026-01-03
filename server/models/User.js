const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    username: {
        type: String,
        required: [true, 'User name is required'],
        unique: true,
        minlength: 5
    },
    email: {
        type: String, 
        required: [true, 'Please enter your email'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Invalid email format']
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: 6
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.matchPassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User