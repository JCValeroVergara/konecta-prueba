const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');
const { models } = require('../../../db/sequelize');


const LocalStrategy = new Strategy(
    {
        usernameField: 'EMAIL',
        passwordField: 'PASSWORD',
    },
    async (EMAIL, PASSWORD, done) => {
        try {
        let user = await models.Users.findOne({
            where: {
                EMAIL,
            },
        });

        if (!user) {
            return done(null, false, { message: 'El email no es valido' });
        }
        const isValid = await bcrypt.compare(PASSWORD, user.PASSWORD);
        if (!isValid) {
            return done(null, false, { message: 'La contraseña no es valida' });
        }
        delete user.dataValues.PASSWORD;
        return done(null, user, { message: 'Autenticación exitosa' });
        } catch (error) {
        throw error;
        }
    }
);

module.exports = LocalStrategy;
