require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../src/index');
const { pool } = require('../src/db/db');

describe('Empleados routes', () => {
    
    let createdEmpleado;

    test('GET Empleados la ruta / Funciona bien al traer los Empleados', async () => {
        const response = await request(app).get('/api/v1/empleados');
        expect(response.status).toBe(200);
    });

    test('Get Empleados la ruta / empleados debe devolver un array de empleados', async () => {
        const response = await request(app).get('/api/v1/empleados');
        expect(response.body).toBeInstanceOf(Array);
    });

    test('POST Empleados la ruta / empleados debe crear un nuevo empleado', async () => {
        const newEmpleado = {
            NOMBRE: 'Carlos Mendoza',
            FECHA_INGRESO: new Date('2022-01-15'),
            SALARIO: 3000
        };
        const response = await request(app)
            .post('/api/v1/empleados')
            .send(newEmpleado);
        
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toContain("application/json");
        expect(response.body.ID).toBeDefined();
        expect(response.body).toHaveProperty("NOMBRE");
        expect(response.body).toHaveProperty("SALARIO");

        createdEmpleado = response.body.ID;
    });

    test('GET Empleados la ruta / empleados/:id debe devolver un empleado por ID', async () => {
        const response = await request(app).get(`/api/v1/empleados/${createdEmpleado}`);

        expect(response.status).toBe(200);
        expect(response.body.ID).toBe(createdEmpleado);
    });

    test('PUT Empleados la ruta / empleados/:id debe actualizar un empleado por ID', async () => {
        const updatedEmpleado = {
            NOMBRE: 'Carlos A. Mendoza',
            SALARIO: 3500.00
        };

        const response = await request(app)
            .put(`/api/v1/empleados/${createdEmpleado}`)
            .send(updatedEmpleado);
        
        expect(response.status).toBe(200);

        expect(response.body.NOMBRE).toBe('Carlos A. Mendoza');
        expect(response.body.SALARIO).toBe(3500.00);
    });

    test('DELETE Empleados la ruta / empleados/:id debe eliminar un empleado por ID', async () => {
        const response = await request(app).delete(`/api/v1/empleados/${createdEmpleado}`);
        expect(response.status).toBe(204);

        const empleado = await request(app).get(`/api/v1/empleados/${createdEmpleado}`);
        expect(empleado.status).toBe(404);
    });

    afterAll(async () => {
        await pool.end();
        server.close();
    });
});