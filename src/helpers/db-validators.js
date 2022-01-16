const { Op } = require('sequelize');

const {
    User,
    Note,
    Task
} = require('../models');


const emailExists = async (email = '') => {
    const emailExists = await User.findOne({ 
        where: {
            email: email
        }
    });

    if(emailExists) {
        throw new Error(`El correo electronico ${email} ya se encuentra registrado`);
    }
}

const noteExists = async (id) => {
    const noteExists = await Note.findOne({
        where: {
            [Op.and]: [{ id_note: id }, { status: 1 }]
        }
    });

    if(!noteExists) {
        throw new Error(`El id de nota no existe: ${id}`);
    }
}

const taskExists = async (id) => {
    const taskExists = await Task.findOne({
        where: {
            [Op.and]: [{ id_task: id }, { status: 1 }]
        }
    });

    if (!taskExists) {
        throw new Error(`El id de la tarea no existe: ${id}`);
    }
}



module.exports = {
    emailExists,
    noteExists,
    taskExists
}