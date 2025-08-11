const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email!']
    },
    location: {
        type: String,
        required: true,
    },
    flag: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },

});

EmployeeSchema.virtual("id").get(function() { return this._id });
EmployeeSchema.set('toJSON', { virtuals: true });
module.exports = mongoose.model("Employee", EmployeeSchema);