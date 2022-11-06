const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    password: String
})

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel