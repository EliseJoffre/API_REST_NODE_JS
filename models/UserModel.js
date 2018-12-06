let mongoose = require('mongoose');


let Schema = mongoose.Schema;

let userSchema = new Schema({
        name: {type: String, required: true},
        password: {type: String, required: true},
        mail: {type: String, required: true, unique: true},
        admin: {type: Boolean, default: false},

    }
);

var User = mongoose.model("user", userSchema);

module.exports = User;