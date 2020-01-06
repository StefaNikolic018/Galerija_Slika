const mongoose=require('mongoose');

//Sema po kojoj upisujemo korisnika u bazu

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//Kreiranje modela korisnika za bazu na osnovu seme

const User= mongoose.model('User', UserSchema);

//Eksportovanje korisnika 

module.exports= User;