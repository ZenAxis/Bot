const mongoose = require('mongoose');

const RolesSchema = new mongoose.Schema({

    // The Discord ID of the user
    userId: {
        type: String,
        required: true,
        unique: true
    },

    // The roles the user had when they left
    roles: {
        type: Array,
        required: true,
        default: []
    },
});

module.exports = mongoose.model('Roles', RolesSchema);