const express = require('express')
const session = require('express-session')
const app = express();
const passport = require('passport')
const dotenv = require('dotenv');
const { isLoggedIn } = require('./middleware/isLoggedIn')

// config
dotenv.config({ path: './__config__/cofig.env' })

// GOOGLE Strategy
require('./auth');

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


// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function (req, res) {
  res.render('pages/about');
});


// app.get('/', (req, res) => {
//   res.send('<a href="/auth/google">Authentication with Google</a>');
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

app.get('/protected', isLoggedIn, (req, res) => {
  console.log(req.user)
  res.send(`Hello `);
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