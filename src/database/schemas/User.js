const { Schema,model } = require("mongoose");

const UserSchema = new Schema({

    username: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
    },
    updatedAt: {
        type:Date,
        default: new Date(),
        required: true,
    },

});

module.exports = model('User',UserSchema);