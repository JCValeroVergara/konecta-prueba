require('dotenv').config();
const request = require('supertest');
const { app, server } = require('../src/index');
const { pool } = require('../src/db/db');

describe('Users routes', () => {

    let createdUser;
    let token;
    
    beforeAll(async () => {
        const logindata = {
            EMAIL: process.env.TEST_EMAIL,
            PASSWORD: process.env.TEST_PASSWORD
        };
        
        const response = await request(app)
            .post('/api/v1/auth')
            .send(logindata);
        
        token = response.body.token;
    });

    test('GET Users la ruta / Funciona bien al traer los Usuarios', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    test('Get Users la ruta / users debe devolver un array de usuarios', async () => {
        const response = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `Bearer ${token}`);
        expect(response.body.users).toBeInstanceOf(Array);
    });

    test('POST Users la ruta / users debe crear un nuevo usuario', async () => {
        const newUser = {
            NOMBRE: 'Maria Perez',
            EMAIL: 'maria@test.com',
            PASSWORD: 'password123',
            ROL: 'Administrador'
        };
        const response = await request(app)
            .post('/api/v1/users')
            .set('Authorization', `Bearer ${token}`)
            .send(newUser);
        
        expect(response.status).toBe(201);
        expect(response.headers["content-type"]).toContain("application/json");
        expect(response.body.ID).toBeDefined();
        expect(response.body).toHaveProperty("NOMBRE");
        expect(response.body.EMAIL).toBe(newUser.EMAIL);

        createdUser = response.body.ID;
    });

    test('GET Users la ruta / users/:id debe devolver un usuario por ID', async () => {
        const response = await request(app)
            .get(`/api/v1/users/${createdUser}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.ID).toBe(createdUser);
    });

    test('PUT Users la ruta / users/:id debe actualizar un usuario por ID', async () => {
        const updatedUser = {
            NOMBRE: 'Maria Gonzalez',
            EMAIL: 'mariagonzalez@test.com',
        };

        const response = await request(app)
            .put(`/api/v1/users/${createdUser}`)
            .set('Authorization', `Bearer ${token}`)
            .send(updatedUser);
        
        expect(response.status).toBe(200);

        expect(response.body.NOMBRE).toBe('Maria Gonzalez');
        expect(response.body.EMAIL).toBe('mariagonzalez@test.com');
    });

    test('DELETE Users la ruta / users/:id debe eliminar un usuario por ID', async () => {
        const response = await request(app)
            .delete(`/api/v1/users/${createdUser}`)
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(204);

        const user = await request(app)
            .get(`/api/v1/users/${createdUser}`)
            .set('Authorization', `Bearer ${token}`);
        expect(user.status).toBe(404);
    });

    afterAll(async () => {
        await pool.end();
        server.close();
    });
});
