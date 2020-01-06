const express=require('express');
const router=express.Router();
const {ensureAuthenticated}=require('../config/auth');

//Sekcija komentara

const Comment=require('./models/Comment');

router.post('/komentar',ensureAuthenticated, (req,res)=>{
    const {ocena,izbor,email,ime,sadrzaj}=req.body;

    let errors=[];

    //Provera zahtevanih polja

    if(!ocena || !email || !ime || !sadrzaj || !izbor){
        errors.push({msg: 'Nisu popunjena sva polja!'});
    }
    if(errors.length>0){
        if(izbor== "Paja Jovanović" || izbor== "Seoba Srba" 
            || izbor== "Krunisanje cara Dušana" || izbor== "Krotitelj zmija" 
            || izbor== "Izdajica" || izbor== "Takovski ustanak" || izbor== "Borba petlova" 
            || izbor== "Ženidba cara Dušana" 
            || izbor== "Bitka u Teutoburškoj šumi" || izbor== "Portret kralja Aleksandara I"){
                req.flash('error_msg', 'Nisu popunjena sva polja!');
                console.log('Korisnik ', req.user.name, ' je pokusao komentarisati na stranici Paje Jovanovića ali je napravio gresku: ' , errors[0]);
                res.redirect('/paja');
            }
            if(izbor== "Uroš Predić" || izbor== "Sveti Sava blagosilja Srpčad" || izbor== "Uzburkano more" 
                  || izbor== "Kosovka devojka" 
                  || izbor== "Siroče na majčinom grobu" || izbor== "Deca oko guslara" || izbor== "Vesela braća, jadna im majka" 
                  || izbor== "Polivanje dodole" ) {
                    req.flash('error_msg', 'Nisu popunjena sva polja!');
                    console.log('Korisnik ', req.user.name, ' je pokusao komentarisati na stranici Uroša Predića ali je napravio gresku: ' , errors[0]);
                    res.redirect('/uros');
                  }
            if(izbor== "Stevan Aleksić" || izbor== "Spaljivanje mošti Svetog Save na Vračaru" 
                  || izbor== "Sveti Georgije ubiva aždahu" 
                  || izbor== "Andjeo" 
                  || izbor== "Autoportret u kafani" || izbor== "Autoportret u kafani II" || izbor== "Golgota" 
                  || izbor== "Veseli Banaćanin" ) {
                    req.flash('error_msg', 'Nisu popunjena sva polja!');
                    console.log('Korisnik ', req.user.name, ' je pokusao komentarisati na stranici Stevana Aleksića ali je napravio gresku: ' , errors[0]);
                    res.redirect('/stevan');                      
                  } 
            if(izbor== "Djordje Krstić" || izbor== "Ćele Kula" 
                  || izbor== "Manastir Studenica" 
                  || izbor== "Utopljenica" 
                  || izbor== "Smrt kneza Lazara" || izbor== "Na izvoru" || izbor== "Obretenje glave Svetog kneza Lazara" 
                  || izbor== "Gružanka" || izbor== "Pad Stalaća" || izbor== "Alegorija na I i II srpski ustanak" ) {
                    req.flash('error_msg', 'Nisu popunjena sva polja!');
                    console.log('Korisnik ', req.user.name, ' je pokusao komentarisati na stranici Djordja Krstića ali je napravio gresku: ' , errors[0]);
                    res.redirect('/djordje');
                      
                  }                
    }
    else{
        const newComment=new Comment({
            ocena,
            izbor,
            email,
            ime,
            sadrzaj
        })
        newComment.save()
            .then(comment=>{
                //Paja Jovanovic
                if(izbor=="Paja Jovanović"){
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je postavio komentar na stranici Paje Jovanovića');
                    res.redirect('/paja');
                }
                if (izbor == "Seoba Srba"){
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name,' je komentarisao sliku "Seoba Srba" ');
                    res.redirect('/slika/seobasrba');
                }
                if (izbor == "Krunisanje cara Dušana") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Krunisanje cara Dušana" ');
                    res.redirect('/slika/krunisanjecaradusana');
                }
                if (izbor == "Krotitelj zmija") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Krotitelj zmija" ');
                    res.redirect('/slika/krotiteljzmija');
                }
                if (izbor == "Izdajica") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Izdajica" ');
                    res.redirect('/slika/izdajica');
                }
                if (izbor == "Takovski ustanak") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Takovski ustanak" ');
                    res.redirect('/slika/takovskiustanak');
                }
                if (izbor == "Borba petlova") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Borba petlova" ');
                    res.redirect('/slika/borbapetlova');
                }
                if (izbor == "Ženidba cara Dušana") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Ženidba cara Dušana" ');
                    res.redirect('/slika/zenidbacaradusana');
                }
                if (izbor == "Bitka u Teutoburškoj šumi") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Bitka u Teutoburškoj šumi" ');
                    res.redirect('/slika/bitkauteutoburskojsumi');
                }
                if (izbor == "Portret kralja Aleksandra I") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Portret kralja Aleksandra I" ');
                    res.redirect('/slika/portretkraljaaleksandra');
                }
                //Uros Predic
                if (izbor == "Uroš Predić") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je postavio komentar na stranici Uroša Predića');
                    res.redirect('/uros');
                }
                if (izbor == "Sveti Sava blagosilja Srpčad") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Sveti Sava blagosilja Srpčad" ');
                    res.redirect('/slika/svetisavablagosiljasrpcad');
                }
                if (izbor == "Uzburkano more") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Uzburkano more" ');
                    res.redirect('/slika/uzburkanomore');
                }
                if (izbor == "Kosovka devojka") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Kosovka devojka" ');
                    res.redirect('/slika/kosovkadevojka');
                }
                if (izbor == "Siroče na majčinom grobu") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Siroče na majčinom grobu" ');
                    res.redirect('/slika/sirocenamajcinomgrobu');
                }
                if (izbor == "Deca oko guslara") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Deca oko guslara" ');
                    res.redirect('/slika/decaokoguslara');
                }
                if (izbor == "Vesela braća, jadna im majka") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Vesela braća, jadna im majka" ');
                    res.redirect('/slika/veselabracajadnaimmajka');
                }
                if (izbor == "Polivanje dodole") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Polivanje dodole" ');
                    res.redirect('/slika/polivanjedodole');
                }
                //Djordje Krstic
                if (izbor == "Djordje Krstić") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je postavio komentar na stranici Djordja Krstića');
                    res.redirect('/djordje');
                }
                if (izbor == "Ćele Kula") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Ćele Kula" ');
                    res.redirect('/slika/celekula');
                }
                if (izbor == "Manastir Studenica") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Manastir Studenica" ');
                    res.redirect('/slika/manastirstudenica');
                }
                if (izbor == "Utopljenica") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Utopljenica" ');
                    res.redirect('/slika/utopljenica');
                }
                if (izbor == "Smrt kneza Lazara") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Smrt kneza Lazara" ');
                    res.redirect('/slika/smrtknezalazara');
                }
                if (izbor == "Na izvoru") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Na izvoru" ');
                    res.redirect('/slika/naizvoru');
                }
                if (izbor == "Obretenje glave Svetog kneza Lazara") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Obretenje glave Svetog kneza Lazara" ');
                    res.redirect('/slika/obretanjeglavesvetogknezalazara');
                }
                if (izbor == "Gružanka") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Gružanka" ');
                    res.redirect('/slika/gruzanka');
                }
                if (izbor == "Pad Stalaća") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Pad Stalaća" ');
                    res.redirect('/slika/padstalaca');
                }
                if (izbor == "Alegorija na I i II srpski ustanak") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Alegorija na I i II srpski ustanak" ');
                    res.redirect('/slika/alegorijanaprviidrugisrpskiustanak');
                }
                //Stevan Aleksic
                if (izbor == "Stevan Aleksić") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je postavio komentar na stranici Stevana Aleksića');
                    res.redirect('/stevan');
                }
                if (izbor == "Spaljivanje mošti Svetog Save na Vračaru") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Spaljivanje mošti Svetog Save na Vračaru" ');
                    res.redirect('/slika/spaljivanjemostijusvetogsavenavracaru');
                }
                if (izbor == "Sveti Georgije ubiva aždahu") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Sveti Georgije ubiva aždahu" ');
                    res.redirect('/slika/svetigeorgijeubivaazdahu');
                }
                if (izbor == "Andjeo") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Andjeo" ');
                    res.redirect('/slika/andjeo');
                }
                if (izbor == "Autoportret u kafani") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Autoportret u kafani" ');
                    res.redirect('/slika/autoportretukafani');
                }
                if (izbor == "Autoportret u kafani II") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Autoportret u kafani II" ');
                    res.redirect('/slika/autoportretukafani2');
                }
                if (izbor == "Golgota") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, ' je komentarisao sliku "Golgota" ');
                    res.redirect('/slika/golgota');
                }
                if (izbor == "Veseli Banaćanin") {
                    req.flash('success_msg', 'Uspešno ste postavili komentar!');
                    console.log('Korisnik ', req.user.name, 'je komentarisao sliku "Veseli Banaćanin" ');
                    res.redirect('/slika/veselibanacanin');
                }              
        })
        .catch(err=> console.log(err));
    }});

//Ruta pocetne strane
router.get('/', (req,res) => {
    res.render('dobrodosli');
});

//Ruta stranice kojoj pristupamo nakon login-a, takodje putem ensureAuthenticated funkcije osiguravamo autentifikaciju pristupa
router.get('/dashboard',ensureAuthenticated,(req,res)=>{
res.render('dashboard',{
    name:req.user.name
});
console.log('Korisnik ', req.user.name, ' je pristupio galeriji.')});

router.get('/paja',ensureAuthenticated,(req,res)=>{
    Comment.find({"izbor":"Paja Jovanović"},{}, (err, docs) => {
        if (err) throw err;
        else {
            res.render('paja', {
                name: req.user.name,
                email: req.user.email,
                komentari: docs
            })
        }
    })
    console.log('Pristup stranici Paje Jovanovića');

})

router.get('/djordje',ensureAuthenticated,(req,res)=>{
    Comment.find({"izbor":"Djordje Krstić"},{}, (err, docs) => {
        if (err) throw err;
        else {
            res.render('djordje', {
                name: req.user.name,
                email: req.user.email,
                komentari: docs
            })
        }
    })
    console.log('Pristup stranici Djordja Krstića');
})

router.get('/stevan',ensureAuthenticated,(req,res)=>{
    Comment.find({"izbor":"Stevan Aleksić"},{}, (err, docs) => {
        if (err) throw err;
        else {
            res.render('stevan', {
                name: req.user.name,
                email: req.user.email,
                komentari: docs
            })
        }
    })
    console.log('Pristup stranici Stevana Aleksića');
})

router.get('/uros',ensureAuthenticated,(req,res)=>{
    Comment.find({"izbor":"Uroš Predić"},{}, (err, docs) => {
        if (err) throw err;
        else {
            res.render('uros', {
                name: req.user.name,
                email: req.user.email,
                komentari: docs
            })
        }
    })
    console.log('Pristup stranici Uroša Predića');
})


router.get('/slika/:id',ensureAuthenticated,(req,res)=>{
    //Slike Paje Jovanovica
    if (req.params.id=='seobasrba'){
        Comment.find({ "izbor": "Seoba Srba"},{}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/thumb/6/6c/Seoba_Srba.jpg/1024px-Seoba_Srba.jpg',
                    izbor1:"Seoba Srba"
                })
            }
        })
        console.log('Pristup slici "Seoba Srba" ');
    }
    if (req.params.id == 'krunisanjecaradusana') {
        Comment.find({ "izbor": "Krunisanje cara Dušana" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/thumb/1/1d/Paja_JovanoviKrunisanje_Cara_Dusana_2.jpg/1280px-Paja_JovanoviKrunisanje_Cara_Dusana_2.jpg',
                    izbor1: "Krunisanje cara Dušana"
                })
            }
        })
        console.log('Pristup slici "Krunisanje cara Dušana" ');
    }
    if (req.params.id == 'krotiteljzmija') {
        Comment.find({ "izbor": "Krotitelj zmija" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Paja_Jovanovi%C4%87_-_Snake_tamer_%281887%29.jpg/800px-Paja_Jovanovi%C4%87_-_Snake_tamer_%281887%29.jpg',
                    izbor1: "Krotitelj zmija"
                })
            }
        })
        console.log('Pristup slici "Krotitelj zmija" ');
    }
    if (req.params.id == 'borbapetlova') {
        Comment.find({ "izbor": "Borba petlova" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/e/ec/Jovanovic_Borba_petlova.jpg',
                    izbor1: "Borba petlova"
                })
            }
        })
        console.log('Pristup slici "Borba petlova" ');
    }
    if (req.params.id == 'izdajica') {
        Comment.find({ "izbor": "Izdajica" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Paja_Jovanovi%C4%87_-_The_traitor_1885%E2%80%931890.jpg/1280px-Paja_Jovanovi%C4%87_-_The_traitor_1885%E2%80%931890.jpg',
                    izbor1: "Izdajica"
                })
            }
        })
        console.log('Pristup slici "Izdajica" ');
    }
    if (req.params.id == 'takovskiustanak') {
        Comment.find({ "izbor": "Takovski ustanak" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/2/22/Paja_Jovanovic-Takovski_ustanak.jpg',
                    izbor1: "Takovski ustanak"
                })
            }
        })
        console.log('Pristup slici "Takovski ustanak" ');
    }
    if (req.params.id == 'zenidbacaradusana') {
        Comment.find({ "izbor": "Ženidba cara Dušana" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/4/41/Zenidba_cara_Dusana.jpg',
                    izbor1: "Ženidba cara Dušana"
                })
            }
        })
        console.log('Pristup slici "Ženidba cara Dušana" ');
    }
    if (req.params.id == 'bitkauteutoburskojsumi') {
        Comment.find({ "izbor": "Bitka u Teutoburškoj šumi" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://4.bp.blogspot.com/-N095rDCTSjA/VcD-kXJozNI/AAAAAAAABfc/TJhiATIptyg/s1600/Furor-Teutonicus_heliogravu.jpg',
                    izbor1: "Bitka u Teutoburškoj šumi"
                })
            }
        })
        console.log('Pristup slici "Bitka u Teutoburškoj šumi" ');
    } if (req.params.id == 'portretkraljaaleksandra') {
        Comment.find({ "izbor": "Portret kralja Aleksandra I" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/f/f5/AleksandarI.jpg',
                    izbor1: "Portret kralja Aleksandra I"
                })
            }
        })
        console.log('Pristup slici "Kralja Aleksandra I" ');
    }
    //Slike Urosa Predica
    if (req.params.id == 'svetisavablagosiljasrpcad') {
        Comment.find({ "izbor": "Sveti Sava blagosilja Srpčad" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Sveti_Sava_blagosilja_Srp%C4%8Dad%2C_Uro%C5%A1_Predi%C4%87%2C_1921.jpg/800px-Sveti_Sava_blagosilja_Srp%C4%8Dad%2C_Uro%C5%A1_Predi%C4%87%2C_1921.jpg',
                    izbor1: "Sveti Sava blagosilja Srpčad"
                })
            }
        })
        console.log('Pristup slici "Sveti Sava blagosilja Srpčad" ');
    }
    if (req.params.id == 'uzburkanomore') {
        Comment.find({ "izbor": "Uzburkano more" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/St._Nikola_and_Patriarch_Lukijan.jpg/1024px-St._Nikola_and_Patriarch_Lukijan.jpg',
                    izbor1: "Uzburkano more"
                })
            }
        })
        console.log('Pristup slici "Uzburkano more" ');
    }
    if (req.params.id == 'kosovkadevojka') {
        Comment.find({ "izbor": "Kosovka devojka" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/Kosovo_Maiden%2C_Uro%C5%A1_Predi%C4%87%2C_1919.jpg',
                    izbor1: "Kosovka devojka"
                })
            }
        })
        console.log('Pristup slici "Kosovka devojka" ');
    }
    if (req.params.id == 'sirocenamajcinomgrobu') {
        Comment.find({ "izbor": "Siroče na majčinom grobu" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Uro%C5%A1_Predi%C4%87_-_Siro%C4%8De.jpg',
                    izbor1: "Siroče na majčinom grobu"
                })
            }
        })
        console.log('Pristup slici "Siroče na majčinom grobu" ');
    }
    if (req.params.id == 'decaokoguslara') {
        Comment.find({ "izbor": "Deca oko guslara" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Uro%C5%A1_Predi%C4%87%2C_The_Children_around_the_Guslar%2C_1882%2C_National_Museum_of_Serbia.jpg/1024px-Uro%C5%A1_Predi%C4%87%2C_The_Children_around_the_Guslar%2C_1882%2C_National_Museum_of_Serbia.jpg',
                    izbor1: "Deca oko guslara"
                })
            }
        })
        console.log('Pristup slici "Deca oko guslara" ');
    }
    if (req.params.id == 'veselabracajadnaimmajka') {
        Comment.find({ "izbor": "Vesela braća, jadna im majka" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/a/a4/Merry_brothers_1887.jpg',
                    izbor1: "Vesela braća, jadna im majka"
                })
            }
        })
        console.log('Pristup slici "Vesela braća, jadna im majka" ');
    }
    if (req.params.id == 'polivanjedodole') {
        Comment.find({ "izbor": "Polivanje dodole" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/%22Watering_of_Dodola%22_by_Uro%C5%A1_Predi%C4%87%2C_published_in_magazine_%22Orao%22_in_1892.jpg',
                    izbor1: "Polivanje dodole"
                })
            }
        })
        console.log('Pristup slici "Polivanje dodole" ');
    }
    //Djordje Krstic
    if (req.params.id == 'celekula') {
        Comment.find({ "izbor": "Ćele Kula" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/e/e2/%C4%90.Krsti%C4%87_Cele_Kula_1883.jpg',
                    izbor1: "Ćele Kula"
                })
            }
        })
        console.log('Pristup slici "Ćele Kula" ');
    }
    if (req.params.id == 'manastirstudenica') {
        Comment.find({ "izbor": "Manastir Studenica" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/sr/8/87/Krstic_studenica.jpg',
                    izbor1: "Manastir Studenica"
                })
            }
        })
        console.log('Pristup slici "Manastir Studenica" ');
    }
    if (req.params.id == 'utopljenica') {
        Comment.find({ "izbor": "Utopljenica" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://slikeiprilike.com/wp-content/uploads/2018/08/.Krstic%CC%81_Utopljenica-e1533667399599.jpg',
                    izbor1: "Utopljenica"
                })
            }
        })
        console.log('Pristup slici "Utopljenica" ');
    }
    if (req.params.id == 'smrtknezalazara') {
        Comment.find({ "izbor": "Smrt kneza Lazara" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://riznicasrpska.net/fotografije/Umetnicke_slike/Djordje_Krstic_-_Smrt_Cara_Lazara,_1885._Vlasnistvo_Niske_eparhije.jpg',
                    izbor1: "Smrt kneza Lazara"
                })
            }
        })
        console.log('Pristup slici "Smrt kneza Lazara" ');
    }
    if (req.params.id == 'naizvoru') {
        Comment.find({ "izbor": "Na izvoru" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/f/f6/%C4%90.Krsti%C4%87_Na_izvoru_1882.jpg',
                    izbor1: "Na izvoru"
                })
            }
        })
        console.log('Pristup slici "Na izvoru" ');
    }
    if (req.params.id == 'obretanjeglavesvetogknezalazara') {
        Comment.find({ "izbor": "Obretenje glave Svetog kneza Lazara" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://facebookreporter.files.wordpress.com/2016/06/19sobretenje-glave-kneza-lazara-c491orc491e-krstic487.jpg',
                    izbor1: "Obretenje glave Svetog kneza Lazara"
                })
            }
        })
        console.log('Pristup slici "Obretenje glave Svetog kneza Lazara" ');
    }
    if (req.params.id == 'gruzanka') {
        Comment.find({ "izbor": "Gružanka" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://ocdn.eu/pulscms-transforms/1/KBjk9lMaHR0cDovL29jZG4uZXUvaW1hZ2VzL3B1bHNjbXMvWkdVN01EQV8vNzY2Nzc4YzI0YWY4NjNiY2UyNGJhZjQ0NTE2ZDFjZmEuanBlZ5GTAs0C5ACBAAE',
                    izbor1: "Gružanka"
                })
            }
        })
        console.log('Pristup slici "Gružanka" ');
    }
    if (req.params.id == 'padstalaca') {
        Comment.find({ "izbor": "Pad Stalaća" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://slikeiprilike.com/wp-content/uploads/2018/08/viber-image1.jpg',
                    izbor1: "Pad Stalaća"
                })
            }
        })
        console.log('Pristup slici "Pad Stalaća" ');
    } if (req.params.id == 'alegorijanaprviidrugisrpskiustanak') {
        Comment.find({ "izbor": "Alegorija na I i II srpski ustanak" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://riznicasrpska.net/fotografije/Umetnicke_slike/Djordje_Krstic_-_Alegorija_na_I_i_II_srpski_ustanak_1904..jpg',
                    izbor1: "Alegorija na I i II srpski ustanak"
                })
            }
        })
        console.log('Pristup slici "Alegorija na I i II srpski ustanak" ');
    }
    //Stevan Aleksic
    if (req.params.id == 'spaljivanjemostijusvetogsavenavracaru') {
        Comment.find({ "izbor": "Spaljivanje mošti Svetog Save na Vračaru" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://www.tozlumikrofon.com/wp-content/uploads/2018/05/sirplar.png',
                    izbor1: "Spaljivanje mošti Svetog Save na Vračaru"
                })
            }
        })
        console.log('Pristup slici "Spaljivanje mošti Svetog Save na Vračaru" ');
    }
    if (req.params.id == 'svetigeorgijeubivaazdahu') {
        Comment.find({ "izbor": "Sveti Georgije ubiva aždahu" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://i.pinimg.com/originals/1a/4f/da/1a4fdacd5588ba0de762d83b351dc421.jpg',
                    izbor1: "Sveti Georgije ubiva aždahu"
                })
            }
        })
        console.log('Pristup slici "Sveti Georgije ubiva aždahu" ');
    }
    if (req.params.id == 'andjeo') {
        Comment.find({ "izbor": "Andjeo" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://kultivisise.rs/wp-content/uploads/2017/03/Stevalexangel-1.jpg',
                    izbor1: "Andjeo"
                })
            }
        })
        console.log('Pristup slici "Andjeo" ');
    }
    if (req.params.id == 'autoportretukafani') {
        Comment.find({ "izbor": "Autoportret u kafani" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/S_Aleksic_autoportret_u_kafani_1901.jpg',
                    izbor1: "Autoportret u kafani"
                })
            }
        })
        console.log('Pristup slici "Autoportret u kafani" ');
    }
    if (req.params.id == 'autoportretukafani2') {
        Comment.find({ "izbor": "Autoportret u kafani II" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://i1.wp.com/www.pancevo.city/wp-content/uploads/2019/07/Slika-1..jpg?w=900&ssl=1',
                    izbor1: "Autoportret u kafani II"
                })
            }
        })
        console.log('Pristup slici "Autoportret u kafani II" ');
    }
    if (req.params.id == 'golgota') {
        Comment.find({ "izbor": "Golgota" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'https://static.kupindoslike.com/GOLGOTA-1918-rad-Stevana-Aleksica-1876-1923-_slika_O_64727199.jpg',
                    izbor1: "Golgota"
                })
            }
        })
        console.log('Pristup slici "Golgota" ');
    }
    if (req.params.id == 'veselibanacanin') {
        Comment.find({ "izbor": "Veseli Banaćanin" }, {}, (err, docs) => {
            if (err) throw err;
            else {
                res.render('slika', {
                    name: req.user.name,
                    email: req.user.email,
                    komentari: docs,
                    slika: 'http://riznicasrpska.net/fotografije/Umetnicke_slike/Stevan_Aleksic_-_Veseli_Banacani.jpg',
                    izbor1: "Veseli Banaćanin"
                })
            }
        })
        console.log('Pristup slici "Veseli Banaćanin" ');
    }
})  









router.get('/umetnik/:id',ensureAuthenticated,(req,res)=>{
    if(req.params.id=='paja'){
        Comment.find({},(err,docs)=>{
            if (err) throw err;
            else {
                res.render('paja',{
                    name:req.user.name,
                    email:req.user.email,
                    komentari: docs
                })
            }
    })
    console.log('Pristup stranici Paje Jovanovića');
}
    if(req.params.id=='djordje'){

    }
    if(req.params.id=='stevan'){

    }
    if(req.params.id=='uros'){

    }
})
//Eksportujemo rute

module.exports= router;