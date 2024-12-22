const bcrypt = require('bcrypt');
const { sequelize, models } = require('../../db/sequelize'); 


const usersData = [
    {
        NOMBRE: 'Juan Carlos',
        EMAIL: 'juan@example.com',
        PASSWORD: 'password123',
        ROL: 'Administrador'
    },
    {
        NOMBRE: 'Maria Perez',
        EMAIL: 'maria@example.com',
        PASSWORD: 'password456',
        ROL: 'Empleado'
    }
];

const empleadosData = [
    {
        NOMBRE: 'Carlos Mendoza',
        FECHA_INGRESO: new Date('2022-01-15'),
        SALARIO: 3000.00
    },
    {
        NOMBRE: 'Laura Gómez',
        FECHA_INGRESO: new Date('2023-03-01'),
        SALARIO: 3500.50
    },
    {
        NOMBRE: 'Pedro Ruiz',
        FECHA_INGRESO: new Date('2023-07-10'),
        SALARIO: 2800.75
    }
];

const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');

        // Seed Users
        for (const user of usersData) {
            const hashedPassword = await bcrypt.hash(user.PASSWORD, 10);
            await models.Users.create({
                ...user,
                PASSWORD: hashedPassword
            });
        }
        
        console.log('Users seeded successfully!');

        // Seed Empleados
        for (const empleado of empleadosData) {
            await models.Empleados.create(empleado);
        }

        console.log('Empleados seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await sequelize.close(); 
    }
};

seedDatabase();
