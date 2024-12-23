const bcrypt = require('bcryptjs');
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
        FECHA_INGRESO: new Date('2012-01-15'),
        SALARIO: 3000.00
    },
    {
        NOMBRE: 'Laura Gómez',
        FECHA_INGRESO: new Date('2013-03-01'),
        SALARIO: 3500.50
    },
    {
        NOMBRE: 'Pedro Ruiz',
        FECHA_INGRESO: new Date('2014-07-10'),
        SALARIO: 2800.75
    },
    {
        NOMBRE: 'Ana López',
        FECHA_INGRESO: new Date('2015-10-20'),
        SALARIO: 4000.00
    },
    {
        NOMBRE: 'Sofía Fernández',
        FECHA_INGRESO: new Date('2016-02-15'),
        SALARIO: 3200.25
    },
    {
        NOMBRE: 'Miguel Torres',
        FECHA_INGRESO: new Date('2017-05-01'),
        SALARIO: 3800.50
    },
    {
        NOMBRE: 'Valeria Ríos',
        FECHA_INGRESO: new Date('2018-09-10'),
        SALARIO: 2900.75
    },
    {
        NOMBRE: 'Tomás Álvarez',
        FECHA_INGRESO: new Date('2019-11-20'),
        SALARIO: 4200.00
    },
    {
        NOMBRE: 'Elena Morales',
        FECHA_INGRESO: new Date('2020-03-15'),
        SALARIO: 3300.25
    },
    {
        NOMBRE: 'Fernando Castro',
        FECHA_INGRESO: new Date('2021-06-01'),
        SALARIO: 3900.50
    },
    {
        NOMBRE: 'Clara Gutiérrez',
        FECHA_INGRESO: new Date('2022-10-10'),
        SALARIO: 3000.75
    },
    {
        NOMBRE: 'Héctor Vargas',
        FECHA_INGRESO: new Date('2023-12-20'),
        SALARIO: 4300.00
    },
    {
        NOMBRE: 'Gabriela Romero',
        FECHA_INGRESO: new Date('2023-03-15'),
        SALARIO: 3400.25
    },
    {
        NOMBRE: 'Julián Herrera',
        FECHA_INGRESO: new Date('2023-06-01'),
        SALARIO: 4000.50
    },
    {
        NOMBRE: 'Mónica Delgado',
        FECHA_INGRESO: new Date('2023-09-10'),
        SALARIO: 3100.75
    },
    {
        NOMBRE: 'Esteban Navarro',
        FECHA_INGRESO: new Date('2023-11-20'),
        SALARIO: 4400.00
    },
    {
        NOMBRE: 'Paula Estrada',
        FECHA_INGRESO: new Date('2022-03-15'),
        SALARIO: 3500.25
    },
    {
        NOMBRE: 'Diego Vargas',
        FECHA_INGRESO: new Date('2022-06-01'),
        SALARIO: 4100.50
    },
    {
        NOMBRE: 'Marina López',
        FECHA_INGRESO: new Date('2021-10-10'),
        SALARIO: 3200.75
    },
    {
        NOMBRE: 'Andrés Castillo',
        FECHA_INGRESO: new Date('2020-12-20'),
        SALARIO: 4500.00
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
