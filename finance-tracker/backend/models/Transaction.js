const {sequelize , DataTypes} = require('./index');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    description: {
        
    },
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    }
});

Transaction.belongsTo(User , {foreignKey: 'userId'});

module.exports = Transaction;