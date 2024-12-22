const express = require('express');

const usersRouter = require('./users/router');
const empleadosRouter = require('./empleados/router');
const solicitudesRouter = require('./solicitudes/router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/users', usersRouter);
    router.use('/empleados', empleadosRouter);
    router.use('/solicitudes', solicitudesRouter);
}

module.exports = routerApi;