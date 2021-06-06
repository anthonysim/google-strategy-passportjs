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
