const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

class Address extends Model { }

Address.init({
    id_address: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    address: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'Address',
    tableName: 'Tbl_Address',
    timestamps: false
});

module.exports = Address;