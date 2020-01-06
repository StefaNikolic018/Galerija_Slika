const express=require('express');
const expressLayouts= require('express-ejs-layouts');
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');

const app=express();

//Zahtevanje passport konfiguracije

require('./config/passport')(passport);

//Zahtevanje konfiguracije baze podataka

const db= require('./config/keys').MongoURI;

// Konekcija na bazu podataka Mongo

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log('Uspesna konekcija na MongoDB'))
    .catch(err => console.log(err));

// EJS template jezik

app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser

app.use(express.urlencoded({extended:false}));

// Express-session middleware(sesija na osnovu koje zakljucujemo da li je korisnik ulogovan)

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//Passport middleware

app.use(passport.initialize());
app.use(passport.session());

//Connect flash

app.use(flash());

// Globalne promenljive za poruke gresaka

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})

// Rute

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT=process.env.PORT || 3000;

app.listen(PORT, console.log(`Server startovan na portu ${PORT}`));
