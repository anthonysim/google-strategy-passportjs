# Google Sign In PassportJS

## Table of Contents

1. [Description](#Description)
2. [Usage](#Usage)
3. [Technologies](#Technologies)
4. [Directions](#Directions)

## Description

Practice Google sign-in authentication using PassportJS.

## Usage
```
Install Dependencies:
- npm install

Start App:
- npm start
```

## Technologies, Packages, etc.

- Node/Express
- EJS

## Directions
1. Install passport and google oauth.
```
npm install passport-google-oauth
```

2. Go to Google Credentials to create a Client & Secret ID. Don't forget to specify the callback.

> auth/google/callback

3. Add the following to your file:

```
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
```

4. Specify your routes and create a middleware function to test if you are signed in or not.

Example:
```
exports.isSignedIn = (req, res, next) => {
  // if they are not signed in
  if (!req.user) {
    console.log(`${req.user} user!`)
    res.redirect('/')

    // if they are signed in, api request finishes up
  } else {
    next()
  }
}
```

5. Add the middleware function to test if you are signed in or not to your protected routes.

Example:
```
// // protected page
app.get('/protected', isSignedIn, function (req, res) {
  res.render('pages/protected', {
    isSignedIn: true
  });
});
```

6. Set your failure & logout routes.

Example:
```
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
```


