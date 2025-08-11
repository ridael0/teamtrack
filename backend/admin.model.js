const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name field is required!'],
    },
    email: {
        type: String,
        unique: [true, "Duplicate Email!"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid Email!']
    },
    password: {
        type: String,
        required: [true, 'password field is required!'],
        minLength: [8, 'Password must be at least 8 characters!'],
    },
});
    
// adminSchema.virtual("hashPassword").get(function() {
//     const hash = bcrypt.hash(this.password, 50);
//     hash.then((h) => console.log(h));
//     return hash;
// });
// adminSchema.method('compareHashes', function(password) {
//     const hash = bcrypt.hash(password, 50);
//     return hash === this.hashPassword;
// });

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;