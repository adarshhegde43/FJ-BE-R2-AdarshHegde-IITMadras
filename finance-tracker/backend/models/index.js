const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

sequelize.authenticate()
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Database connection failed:', err));

// Import models
const User = require('./User')(sequelize, DataTypes);
const ExpenseCategory = require('./ExpenseCategory')(sequelize, DataTypes);
const IncomeSource = require('./IncomeSource')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);

// Setup associations
Transaction.belongsTo(User, { foreignKey: 'userId' });
Transaction.belongsTo(ExpenseCategory, { foreignKey: 'expenseCategoryId' });
Transaction.belongsTo(IncomeSource, { foreignKey: 'incomeSourceId' });

User.hasMany(Transaction, { foreignKey: 'userId' });

module.exports = {
    sequelize,
    Sequelize,
    User,
    ExpenseCategory,
    IncomeSource,
    Transaction
};
