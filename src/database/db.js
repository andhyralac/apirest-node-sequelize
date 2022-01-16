const { Sequelize } = require('sequelize');
const { database } = require('./config');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,{
        host: database.host,
        dialect: "mysql"
    }
);

const connectDB = async () => {
    try{
        await sequelize.sync({});
        console.log('DB is connectd');
    }catch(err){
        console.error('Error connecting to database', err);
        await sequelize.close();
    }
}

// const disconnectDB = async () => {
//     try{
//          await sequelize.close();
//          console.log('DB disconnect');
//     }catch(err){
//         console.log(`Error disconnect DB`, err);
//     }
// }

module.exports ={
    sequelize,
    connectDB
};