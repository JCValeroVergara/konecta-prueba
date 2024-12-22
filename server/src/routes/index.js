const express = require('express');
const passport = require('passport');

const loginRouter = require('./auth/router');
const usersRouter = require('./users/router');
const empleadosRouter = require('./empleados/router');
const solicitudesRouter = require('./solicitudes/router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/auth', loginRouter);

    router.use(passport.authenticate('jwt', { session: false }));
    router.use('/users', usersRouter);
    router.use('/empleados', empleadosRouter);
    router.use('/solicitudes', solicitudesRouter);
}

module.exports = routerApi;