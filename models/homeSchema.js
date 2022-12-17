const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = new schema({
    username:{
        type: String,
        required:true
    },
    email: {
        type: String,
        unique:true,
        required:true
    },
    noTelp: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required:true
    }
})

module.exports = mongoose.model('RegisterUser', userSchema)