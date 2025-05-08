const { Sequelize , DataTypes } = require('sequelize');
require('dotenv').config();

//Creating a Sequelize instance , and connecting it to PostgreSQL...
//Using values from .env for db configuration...
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'postgres',
    username:  process.env.DB_USER,
    password:  process.env.DB_PASSWORD,
    database:  process.env.DB_NAME,
})

//Now testing the connection...
sequelize.authenticate()
    .then(() => console.log('Databse connected successfully !'))
    .catch(err => console.log('Unable to connect to the database: ',err));

//Exporting the sequelize to other models...
module.exports = {sequelize , DataTypes};