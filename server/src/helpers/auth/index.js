const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategies');
const JwtStategy = require('./strategies/jwt.strategies');

passport.use(LocalStrategy);
passport.use(JwtStategy);

module.exports = passport;
