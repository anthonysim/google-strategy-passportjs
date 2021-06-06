exports.isSignedIn = (req, res, next) => {
  if (!req.user) {
    console.log(`${req.user} user!`)
    res.redirect('/')
  } else {
    next()
  }
}
