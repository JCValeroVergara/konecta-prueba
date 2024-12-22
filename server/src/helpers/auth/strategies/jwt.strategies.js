const { Strategy, ExtractJwt } = require('passport-jwt')



const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}


const JwtStategy = new Strategy(options, async (payload, done) => {
    return done(null, payload)
})

module.exports = JwtStategy