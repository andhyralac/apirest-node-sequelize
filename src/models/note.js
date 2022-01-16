const { Model, DataTypes, Op } = require('sequelize');
const { sequelize } = require('../database/db');

class Note extends Model {

    async getAllNoteByUser(idUser) {
        const notes = await Note.findAll({
            where: {
                [Op.and]: [{ note_user: idUser }, { status: 1 }]
            },
            attributes: ['id_note', 'title', 'description_note']
        });

        return notes;
    }

    async create({ title, description, idUser }) {
        const note = await Note.create({
            title: title,
            description_note: description,
            note_user: idUser
        });

        return note;
    }

    async updateById({ idNote, title, description }) {
        const noteUpdate = await Note.update({
            title: title,
            description_note: description
        }, {
            where: {
                id_note: idNote
            }
        });

        return noteUpdate;
    }

    async delete(idNote) {
        const noteDelete = await Note.update({
            status: 0
        }, {
            where: {
                id_note: idNote
            }
        });

        return noteDelete;
    }

}

Note.init({
    id_note: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: DataTypes.STRING,
    description_note: {
        type: DataTypes.TEXT,
    },
    status: {
        type: DataTypes.INTEGER,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'Note',
    tableName: 'Tbl_Notes',
    timestamps: false
});

module.exports = Note;