//data and database structure.
const mongoose = require('mongoose');

//user schema
const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: (true,'username is required'),
    },
    email: {
        type: String,
        required: (true,'email is required'),
        unique: true
    },
    password: {
        type: String,
        required: (true,'password is required'),
    },
    address:{
        type: String,
    },
    phone:{
        type:String,
        required: (true,'phone number is required'),
    },
    userType:{
        type:String,
        required: (true,'user type is required'),
        default:'client',
        enum: ['client','admin','vendor','driver']

    },
    profile:{
        type:String,
        default:'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid'

    }

},{timestamps:true});

module.exports = mongoose.model('User', userSchema);