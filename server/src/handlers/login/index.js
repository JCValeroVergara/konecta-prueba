require('dotenv').config();
const passport = require('passport');
const jwt = require('jsonwebtoken');


const signToken = (user) => {
    const payload = {
        sub: user.ID,
        email: user.EMAIL,
        rol: user.ROL,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    return { user, token };
}

const loginHandler = async (req, res, next) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.status(401).json({ message: info.message });
        }

        req.user = user;

        const { token } = signToken(user);
        res.status(200).json({ user: { ID: user.ID, EMAIL: user.EMAIL, ROL: user.ROL }, token });
    })(req, res, next);
}

module.exports = {loginHandler};