const { Task } = require('../models');

const task = new Task();

const getAllTaskByUser = async (req, res) => {
    const { user } = req.user;

    if (!user) {
        return res.json({
            msg: 'El id usuario es un parametro requerido'
        })
    }

    try {

        const tasks = await task.getAllTaskByUser(user);

        if (!tasks) {
            return res.json({
                msg: 'Usuario todavia no tiene tareas almacenadas'
            });
        }

        return res.json(tasks);

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al obtener las tareas del usuario'
        })
    }
}


const createTask = async (req, res) => {
    const data = {
        description: req.body.description,
        deadline: req.body.deadline,
        idUser: req.user.user
    };

    try {
        const result = await task.create(data);

        if (!result) {
            return res.status(400).json({
                msg: 'No se pudo almacenar los datos de la tarea'
            });
        }

        res.status(201).json({
            msg: 'Tarea creada exitosamente'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al crear la tarea'
        })
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ msg: 'El id es obligatorio' });
    }

    const data = {
        idTask: id,
        description: req.body.description,
        deadline: req.body.deadline,
    };

    try {
        const result = await task.updateById(data);

        if (!result) {
            return res.status(400).json({
                msg: 'No se pudo actualizar los datos de la Tarea'
            });
        }

        res.status(201).json({
            msg: 'Tarea actualizada correctamente'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error al actualizar la tarea'
        })
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await task.delete(id);

        if (!result) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la Tarea'
            });
        }

        res.status(201).json({
            msg: 'Tarea eliminada'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo eliminar la Tarea'
        })
    }
}


module.exports = {
    getAllTaskByUser,
    createTask,
    updateTask,
    deleteTask
}