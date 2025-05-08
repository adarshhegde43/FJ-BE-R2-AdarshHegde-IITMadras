const { sequelize, DataTypes } = require('./index');

const IncomeSource = sequelize.define('IncomeSource', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = IncomeSource;
