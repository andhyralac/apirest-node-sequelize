const express = require('express');
const cors = require('cors');

const { connectDB } = require('../database/db');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.associations();
        this.connect();
        this.middlewares();
        this.routes();
    }

    async connect() {
        await connectDB();
    }

    associations() {
        require('../database/associations');
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/v1.0', require('../routes/index'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server on port ${this.port}`);
        });
    }
}


module.exports = Server;