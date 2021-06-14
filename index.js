const express = require('express')
const session = require('express-session')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST, PORT, SECRET} = require('./config/config')
const app = express()

app.set('view engine', 'ejs')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SECRET
}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', function (req, res) {
    res.render('pages/auth')
})

app.get('/success', (req, res) => {
    res.render('pages/success', {user: userProfile})
})
app.get('/error', (req, res) => res.send("error logging in"))

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }))

app.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/error'
    }), (req, res) => {
        res.redirect('/success')
    })

app.listen(PORT, () => console.log(`listening on ${PORT}`))


let userProfile

passport.serializeUser((user, cb) => {
    cb(null, user)
})

passport.deserializeUser((obj, cb) => {
    cb(null, obj)
})

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `http://${HOST}:${PORT}/callback`
    },
    (accessToken, refreshToken, profile, done) => {
        userProfile = profile
        return done(null, userProfile)
    }
))
