module.exports = (sequelize, DataTypes) => {
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
        expenseCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        incomeSourceId: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    return Transaction;
};
