const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { isLoggedIn } = require('./middleware/isLoggedIn');
const dotenv = require('dotenv');

// config
dotenv.config({ path: './__config__/cofig.env' })

// set the view engine to ejs
app.set('view engine', 'ejs');

// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: true,
//   // cookie: {
//   //   maxAge: 20000
//   // }
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// ========== GOOGLE STRATEGY ============
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: 'http://localhost:3000/google/callback'
// },
//   function (accessToken, refreshToken, profile, done) {
//     return done(null, profile);
//   }
// ));

// passport.serializeUser(function (user, done) {
//   done(null, user)
// });

// passport.deserializeUser(function (user, done) {
//   done(null, user)
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email', 'profile'] }
//   ));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect: '/protected',
//     failureRedirect: '/auth/google/failure'
//   })
// );

// app.get('/protected', isLoggedIn, (req, res) => {
//   res.render('pages/protected');
// });



// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// about page
app.get('/protected', function (req, res) {
  res.render('pages/protected');
});


app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT} 🎈!`)
})