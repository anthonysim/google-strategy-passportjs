const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { isSignedIn } = require('./middleware/isSignedIn');
const dotenv = require('dotenv');

// config
dotenv.config({ path: './__config__/config.env' })

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 20000 // new Date(Date.now() + 3600000 * n) n equals the number of hours
  }
}));

// ========== GOOGLE STRATEGY ============
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user)
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback'
},
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);


// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// // protected page
app.get('/protected', isSignedIn, function (req, res) {
  res.render('pages/protected', {
    isSignedIn: true
  });
});

// failure
app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// logout
app.get('/signout', isSignedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  console.log('Goodbye!');
  res.redirect('/');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} 🎈!`)
})