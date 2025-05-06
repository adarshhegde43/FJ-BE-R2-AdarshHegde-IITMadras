const {sequelize , DataTypes } = require('./index');


const User = sequelize.define('User' , {

    id: {
        type : DataTypes.INTEGER,
        primaryKey: true, //identify user by their id....
        autoIncrement: true //generates a unique id everytime object inserted into db...
    },

    username: {
        type : DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true //validates whether email is of format foo@bar.com
        }
    },

    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = User ;