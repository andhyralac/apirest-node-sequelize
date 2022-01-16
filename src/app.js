const dotenv = require('dotenv');
dotenv.config();

const { Server }  = require('./models/index');

const server = new Server();

server.listen();