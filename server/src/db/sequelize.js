require('dotenv').config();
const { Sequelize } = require('sequelize');
const setupModels = require('../models');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }
)

const models = setupModels(sequelize);

const syncModels = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({  alter: true });
        console.log('Models synchronized with the database');
    } catch (error) {
        console.error('Error synchronizing database', error);
    }
}

module.exports = { sequelize, models, syncModels };