const { Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');

class Task extends Model {
    async getAllTaskByUser(idUser) {
        const tasks = await Task.findAll({
            where: {
                [Op.and]: [{ task_user: idUser }, { status: 1 }]
            },
            attributes: ['id_task','description_task', 'deadline']
        });

        return tasks;
    }

    async create({ description, deadline, idUser }) {
        const task = await Task.create({
            description_task: description,
            deadline: deadline,
            task_user: idUser
        });

        return task;
    }

    async updateById({ idTask, description, deadline }) {
        const taskUpdate = await Task.update({
            description_task: description,
            deadline: deadline
        }, {
            where: {
                id_task: idTask
            }
        });

        return taskUpdate;
    }

    async delete(idTask) {
        const taskDelete = await Task.update({
            status: 0
        }, {
            where: {
                id_task: idTask
            }
        });

        return taskDelete;
    }
}

Task.init({
    id_task: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    description_task: DataTypes.STRING,
    deadline: DataTypes.DATE,
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'Tbl_Task',
    timestamps: false
});

module.exports = Task;