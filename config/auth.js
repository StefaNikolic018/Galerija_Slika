module.exports ={
    ensureAuthenticated: function(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg','Ulogujte se da bi videli resurse ove stranice!');
        res.redirect('/users/login');
        console.log('Pokusaj pristupa bez login-a')
    }
}
/*Definisanje funkcije autentikacije, 
i definisanje poruke koja se stampa u slucaju pokusaja pristupa nekoj ruti bez prvobitnog logovanja.
Zatim redirekcija na stranu za login.
*/