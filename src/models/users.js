const { Password } = require('@mui/icons-material');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    }, Password: {
        type: String,
        required: true
    }
})