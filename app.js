var express = require('express'), app = express(), expressSanitizer = require('express-sanitizer'), bodyParser = require('body-parser'), mongoose = require('mongoose'); var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose"); var passport = require("passport");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/CMS');
app.use(express.static('public'));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
var announcementSchema = new mongoose.Schema({
    announcement: String
});
var pageSchema = new mongoose.Schema({
    id: Number,
    brandIcon: String,
    brandName: String,
    bigTitle: String,
    bigText: String,
    ownTitle: String,
    ownText: String,
    university: String,
    uNote: String,
    uImg: String,
    about: String,
    visit: Number,
    de: String,
    address: String,
    phone: String,
    email: String,
    fb: String,
    insta: String,
    tw: String,
    yt: String,
    Jimg: String
});
var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    admin: String
});
var formSchema = new mongoose.Schema({
    form: String,
    about: String
});
UserSchema.plugin(passportLocalMongoose);
var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model("User", UserSchema);
var Form = mongoose.model('Form', formSchema);
var announcement = mongoose.model('announcement', announcementSchema);
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {


    Page.countDocuments({}, (err, count) => {
        if (count == 0) {
            console.log('SEEDING THE DATA BASE');
        }
        if (count !== 0) {
            Page.find({}, (err, page) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('index', { page: page, user: req.user });
                    Page.findOneAndUpdate({ id: 1 }, { $inc: { visit: 1 } }, { upsert: true }, (err, inc) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        } else {
            Page.create({
                id: 1,
                brandIcon: 'http://blogs.acu.edu/innovation_foundry/files/2016/07/Adobe-Au-icon.png',
                brandName: 'Your Brand name',
                bigTitle: 'CMS - College Team',
                bigText: 'This is a open source CMS ..thanks for using',
                ownTitle: 'Title for your Team',
                ownText: 'Team Description - This is the area where you can describe about your team and its specialization. This description help the user to understand about the team and to join and participate in your team',
                university: 'University',
                uNote: 'About university - Here you should tell about you university and its strength. You can also describe about the current research and academic disciplines available.',
                uImg: 'image2.jpg',
                about: 'About you - This is the place where you should mention the speciality of your team. Describe the vision and mission of your team. Provide lead information and his/her experience in this area',
                Jimg: 'image1.jpg'
            }, (err, page) => {
                if (err) {
                    console.log('err');
                } else {
                    Page.find({}, (err, page) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('index', { page: page, user: req.user });


                        }
                    });
                }
            });
        }
    });
});
app.get('/form', (req, res) => {
    Form.find({}, (err, form) => {
        if (err) {
            console.log(err);
        } else {
            Page.find({}, (err, page) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('gform', { form: form, page: page, user: req.user });
                }
            });
        }
    });
});
app.get('/announcement', isLoggedIn, (req, res) => {
    announcement.find({}, (err, announcement) => {
        if (err) {
            console.log(err);
        } else {
            Page.find({}, (err, page) => {
                if (err) {
                    console.log(err);
                } else {
                    res.render('announcement', { announcement: announcement, page: page, user: req.user });
                }
            });
        }
    });
});
app.get('/admin', isLoggedIn, (req, res) => {
    if (req.user.admin === 'A') {
        Page.find({}, (err, page) => {
            if (err) {
                console.log(err);
            } else {
                User.find({}, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        announcement.find({}, (err, announcement) => {
                            if (err) {
                                console.log(err);
                            } else {
                                Form.find({}, (err, form) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.render('form', { page: page, user: user, announcement: announcement, form: form });
                                    }
                                });
                            }
                        });

                    }
                });
            }
        });
    } else {
        res.redirect('/');
    }

});
app.post('/announcement/new', isLoggedIn, (req, res) => {
    req.body.announcement = req.sanitize(req.body.announcement);
    announcement.create({
        announcement: req.body.announcement
    }, (err, announcement) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    })
})
app.post('/admin', isLoggedIn, (req, res) => {

    req.body.brandIcon = req.sanitize(req.body.brandIcon);
    req.body.brandName = req.sanitize(req.body.brandName);
    req.body.bigTitle = req.sanitize(req.body.bigTitle);
    req.body.bigText = req.sanitize(req.body.bigText);
    req.body.ownTitle = req.sanitize(req.body.ownTitle);
    req.body.ownText = req.sanitize(req.body.ownText);
    req.body.university = req.sanitize(req.body.university);
    req.body.uNote = req.sanitize(req.body.uNote);
    req.body.uImg = req.sanitize(req.body.uImg);
    req.body.uImg = req.sanitize(req.body.uImg);
    req.body.about = req.sanitize(req.body.about);
    req.body.address = req.sanitize(req.body.address);
    req.body.phone = req.sanitize(req.body.phone);
    req.body.email = req.sanitize(req.body.email);
    req.body.fb = req.sanitize(req.body.fb);
    req.body.insta = req.sanitize(req.body.insta);
    req.body.tw = req.sanitize(req.body.tw);
    req.body.yt = req.sanitize(req.body.yt);
    req.body.Jimg = req.sanitize(req.body.Jimg);

    Page.findOneAndUpdate({ id: 1 }, {
        $set: {
            brandIcon: req.body.brandIcon,
            brandName: req.body.brandName,
            bigTitle: req.body.bigTitle,
            bigText: req.body.bigText,
            ownTitle: req.body.ownTitle,
            ownText: req.body.ownText,
            university: req.body.university,
            uNote: req.body.uNote,
            uImg: req.body.uImg,
            about: req.body.about,
            de: req.body.de,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            fb: req.body.fb,
            insta: req.body.insta,
            tw: req.body.tw,
            yt: req.body.yt,
            Jimg: req.body.Jimg
        }
    }, { new: true }, (err, page) => {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/admin');
});
app.post('/form/new', isLoggedIn, (req, res) => {
    Form.create({
        form: req.body.form,
        about: req.body.about
    }, (err, form) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin');
        }
    });
});
app.post('/form/:id/delete', (req, res) => {
    Form.findByIdAndRemove(req.params.id, (err) => {

    });
    res.redirect('/admin')
});
app.post('/admin/:id/delete', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err) => {

    });
    res.redirect('/admin');
});
app.post('/announcement/:id/delete', (req, res) => {
    announcement.findByIdAndRemove(req.params.id, (err) => {

    });
    res.redirect('/admin');
});
app.get("/register", (req, res) => {
    res.render("register", { err: '' });
})

app.post("/register", (req, res) => {
    User.countDocuments({}, (err, count) => {
        if (count == 0) {
            User.register(new User({ username: req.body.username, admin: 'A' }), req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.render('register', { err: 'User Already exist' });
                }
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            });
        } else {
            User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
                if (err) {
                    console.log(err);
                    return res.render('register', { err: 'User Already exist' });
                }
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            });
        }
    })
});

app.get("/login", (req, res) => {
    res.render("login");

});
app.get('/fail', (req, res) => {
    res.render('fail');
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/fail"
}), (req, res) => {

});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login');
}
app.get("/logout", (req, res) => { req.logout(); res.redirect("/"); });
app.get('*', (req, res) => {
    res.redirect('/');
});
app.listen(process.env.PORT || 3000, () => {
    console.log('SERVER STARTED');
});
