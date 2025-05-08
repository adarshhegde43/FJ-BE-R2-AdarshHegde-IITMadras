const {sequelize , DataTypes} = require('./index');
const User = require('./User');
const Expensecategory = require('./ExpenseCategory');
const IncomeSource = require('./IncomeSource');

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
    type: {
        type: DataTypes.ENUM('income', 'expense'),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },

    // Foreign Key for ExpenseCategory (only for expenses)
    expenseCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ExpenseCategory,
            key: 'id'
        },
        validate: {
            isIn: [['expense']]  // Ensures this is set only if type is 'expense'
        }
    },

    // Foreign Key for IncomeSource (only for income)
    incomeSourceId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: IncomeSource,
            key: 'id'
        },
        validate: {
            isIn: [['income']]  // Ensures this is set only if type is 'income'
        }
    },
});

Transaction.belongsTo(User , {foreignKey: 'userId'});
Transaction.belongsTo(Expensecategory , {foreignKey: 'expenseCategoryId'});
Transaction.belongsTo(IncomeSource , {foreignKey: 'incomeSourceId'});


module.exports = Transaction;