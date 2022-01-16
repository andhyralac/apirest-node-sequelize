const {Model, DataTypes} = require('sequelize');
const { sequelize } = require('../database/db');
const Address = require('./address');


class User extends Model {

    async create({name, surname, nickName, address, email, password, image = ''}) {
        const user = await User.create({
            name: name,
            surname: surname,
            nick_name: nickName,
            email: email,
            password: password,
            image: image,
            address_user: {
                address: address
            }
        }, { include: 'address_user'});

        return user.toJSON();
    }

    async getUser(idUser) {
        const user = await User.findOne({ 
            include: {
                model: Address,
                as: 'address_user',
                attributes: ['address']
             }, 
            where: {
                id_user: idUser
            }
        });

        return user;
    }

    async getUserByEmail(email){
        const user = await User.findOne({
            include: {
                model: Address,
                as: 'address_user',
                attributes: ['address']
            },
            where: {
                email: email
            }
        });

        return user;
    }

}

User.init({
    id_user: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    nick_name: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: DataTypes.STRING,
    image: DataTypes.STRING,
    status_user: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'User', // providing the name to the model
    tableName: 'Tbl_Users', //providing the table name directly
    timestamps: false
});

User.prototype.toJSON =  function () {
    const dataUser = Object.assign({}, this.get());
    const { id_user, password, address_user, ...user } = dataUser;
    user.user = id_user;
    user.address = address_user.address;
    return user;
}

module.exports = User;