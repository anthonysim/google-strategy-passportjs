const express = require('express')
const session = require('express-session')
const cors = require('cors')
const app = express()
const passport = require('passport')
require('./auth');

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true,
  // cookie: {
  //   maxAge: 20000
  // }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authentication with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }
  ));

app.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/protected',
    failureRedirect: '/auth/google/failure'
  })
);

app.get('/protected', isLoggedIn, (req, res) => {
  console.log(req.user)
  res.send(`Hello `);
});


app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}!`)
})