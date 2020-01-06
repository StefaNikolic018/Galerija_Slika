const LocalStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

// Ucitavanje korisnickog modela koji smo definisali ranije

const User= require('../routes/models/User');

//Eksportujemo strategiju za 

module.exports=function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'email'},(email,password,done)=>{
            
            // Uporedjivanje mejla korisnika i vracanje poruke u slucaju da nije registrovan u bazi

            User.findOne({email: email})
                .then(user => {
                    if(!user){
                        console.log('Email nije u bazi podataka');
                        return done(null, false, {message: 'Email nije registrovan'});
                    }

                    // Uporedjivanje vec kriptovane sifre i vracanje poruke ako je sifra pogresna

                    bcrypt.compare(password, user.password, (err, isMatch)=>{
                        if(err) throw err;

                        if(isMatch){
                            return done(null, user);
                        }
                        else{
                            console.log('Neispravna sifra');
                            return done(null, false, {message: 'Pogresna sifra!'});
                        }
                    });
                })
                .catch(err=>console.log(err));
        })
    );
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}