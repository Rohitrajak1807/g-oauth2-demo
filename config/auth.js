const passport = require('passport')
const googleOAuth = require('passport-google-oauth').OAuth2Strategy
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST, PORT, SECRET} = require('./config/config')


passport.use(new googleOAuth({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://${HOST}:${PORT}/callback`
}, (accessToken, refreshToken, profile, done) => {
    userProfile = profile
    return done(null, userProfile)
}))


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
