const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport');

//User model
const User= require('./models/User');

//Ruta Login stranice
router.get('/login', (req,res) => {
    console.log('Pristup login stranici');
    return res.render('login');
});

//Ruta Register stranice
router.get('/register', (req,res) => {
    console.log('Pristup register stranici');
    res.render('register');
});

//Hendlovanje registracije

router.post('/register', (req,res)=>{
    const {name,email,password,password2}=req.body;

    let errors=[];

    //Provera zahtevanih polja

    if(!name || !email || !password || !password2){
        errors.push({msg: 'Nisu popunjena sva polja!'});
    }

    //Provera poklapanja sifre

    if(password !== password2){
        errors.push({msg:'Sifre se ne poklapaju!'});
    }

    //Provera duzine sifre

    if(password.length < 6){
        errors.push({msg: 'Sifra treba biti duza od 6 karaktera'});
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
        console.log('Korisnik je pokusao registraciju ali je napravio gresku: ' ,errors);
    } else {
        // Ako je ispunio sve kriterijume registracije, uporedjujemo da li postoji u bazi podataka
        User.findOne({email: email})
            .then(user => {
                if(user){
                    //Ako imejl postoji u bazi podataka
                    errors.push({msg: 'Email je vec registrovan'});
                    res.render('register',{
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                    console.log('Korisnik je pokusao registraciju ali je napravio gresku: '+errors);
                } else { // Ako su svi kriterijumi zadovoljeni, kreiramo novog korisnika i upisujemo podatke
                    const newUser=new User({
                        name,
                        email,
                        password
                    });
                    //Sablon za kriptovanje sifre
                    bcrypt.genSalt(10, (err,salt)=>
                    bcrypt.hash(newUser.password, salt, (err, hash)=>{
                      if(err) throw err;
                      // Kriptovanje sifre sablonom koji smo prethodno generisali
                      newUser.password = hash;
                      // Upisivanje korisnika u bazu, zatim vracanje poruke o uspehu registracije, i redirekcija na login stranicu
                      console.log('Uspesna registracija korsnika '+newUser.name);
                      newUser.save()
                        .then(user=>{
                            req.flash('success_msg','Uspesno ste registrovani, ulogujte se!');
                            res.redirect('/users/login');
                        })
                        .catch(err=> console.log(err));
                    }));
                }
            });
    }
});

//Hendlovanje login-a, u slucaju uspeha redirekcija na dashboard stranicu, u slucaju neuspeha povratak na login stranicu i poruka o gresci

router.post('/login',(req,res, next)=>{
    passport.authenticate('local',{
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: 'Pogresan Email ili sifra'})(req,res,next);
});

//Hendlovanje logout-a, ispisivanje poruke, zatim redirekcija na login stranicu
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg', 'Upravo ste se izlogovali');
    res.redirect('/users/login');
    console.log("Izlogovan korisnik ");
})

//Eksportovanje ruta

module.exports= router;