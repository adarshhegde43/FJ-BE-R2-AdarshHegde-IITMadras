module.exports = (sequelize, DataTypes) => {
    const ExpenseCategory = sequelize.define('ExpenseCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return ExpenseCategory;
};
