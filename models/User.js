const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    username:{
        type: String, 
        required: true,
        unique:true
    },
    password: {
        type: String, 
        required: true
    }

});

UserSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => { // 19 la so lan ma hoa
        user.password = hash;
        next()
    })
})

const User = mongoose.model('User', UserSchema);
module.exports = User;