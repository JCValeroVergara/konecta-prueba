require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../src/index');
const { pool } = require('../src/db/db');

describe('Solicitud routes', () => {

    let createdSolicitud;
    let createdEmpleado;
    let token;

    beforeAll(async () => {

        const logindata = {
            EMAIL: process.env.TEST_EMAIL,
            PASSWORD: process.env.TEST_PASSWORD,
        };

        const response = await request(app)
            .post('/api/v1/auth')
            .send(logindata);
        
        token = response.body.token;

        const newEmpleado = {
            NOMBRE: 'Carlos Mendoza',
            FECHA_INGRESO: new Date('2022-01-15'),
            SALARIO: 3000.00,
        };
        const responseEmpleado = await request(app)
            .post('/api/v1/empleados')
            .set('Authorization', `Bearer ${token}`)
            .send(newEmpleado);
        
        createdEmpleado = responseEmpleado.body.ID;
    });

    test('GET Solicitud la ruta / Funciona bien al traer las Solicitudes', async () => {
        const response = await request(app)
            .get('/api/v1/solicitudes')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    test('Get Solicitud la ruta / solicitud debe devolver un array de solicitudes', async () => {
        const response = await request(app)
            .get('/api/v1/solicitudes')
            .set('Authorization', `Bearer ${token}`);
        expect(response.body.solicitudes).toBeInstanceOf(Array);
    });

    test('POST Solicitud la ruta / solicitud debe crear una nueva solicitud', async () => {
        const newSolicitud = {
            CODIGO: 'SOL-001',
            DESCRIPCION: 'Solicitud de empleo',
            RESUMEN: 'Solicitud de empleo para el puesto de programador',
            ID_EMPLEADO: createdEmpleado,
        };
        const response = await request(app)
            .post('/api/v1/solicitudes')
            .set('Authorization', `Bearer ${token}`)
            .send(newSolicitud);
        
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toContain("application/json");
        expect(response.body.ID).toBeDefined();
        expect(response.body).toHaveProperty("CODIGO");
        expect(response.body.RESUMEN).toBe(newSolicitud.RESUMEN);

        createdSolicitud = response.body.ID;
    });

    test('GET Solicitud la ruta / solicitud/:id debe devolver una solicitud por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/solicitudes/${createdSolicitud}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.ID).toBe(createdSolicitud);
    });

    test('PUT Solicitud la ruta / solicitud/:id debe actualizar una solicitud por ID', async () => {
        const updatedSolicitud = {
            CODIGO: 'SOL-001-UPDATED',
            DESCRIPCION: 'Solicitud de empleo actualizada',
        };

        const response = await request(app)
            .put(`/api/v1/solicitudes/${createdSolicitud}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedSolicitud);
        
        expect(response.status).toBe(200);

        expect(response.body.CODIGO).toBe('SOL-001-UPDATED');
        expect(response.body.DESCRIPCION).toBe('Solicitud de empleo actualizada');
    });

    test('DELETE Solicitud la ruta / solicitud/:id debe eliminar una solicitud por ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/solicitudes/${createdSolicitud}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);

        const responseEmpleado = await request(app)
            .delete(`/api/v1/empleados/${createdEmpleado}`)
            .set('Authorization', `Bearer ${token}`);
        expect(responseEmpleado.status).toBe(204);

        const solicitud = await request(app)
            .get(`/api/v1/solicitudes/${createdSolicitud}`)
            .set('Authorization', `Bearer ${token}`);
        expect(solicitud.status).toBe(404);

        const empleado = await request(app)
            .get(`/api/v1/empleados/${createdEmpleado}`)
            .set('Authorization', `Bearer ${token}`);
        expect(empleado.status).toBe(404);
    });

    afterAll(async () => {
        await pool.end();
        server.close();
    });
});