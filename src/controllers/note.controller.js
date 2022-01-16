const { Note } = require('../models');

const note = new Note();

const getAllNoteByUser = async (req, res) => {
    const { user } = req.user;

    if (!user) {
        return res.json({
            msg: 'El id usuario es un parametro requerido'
        })
    }

    try{

        const notas = await note.getAllNoteByUser(user);

        if(!notas){
            return res.json({
                msg: 'Usuario todavia no tiene notas almacenadas'
            });
        }

        return res.json(notas);

    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'Error al obtener las notas del usuario'
        })
    }
}

const createNote = async (req, res) => {
    const data = {
        title: req.body.title,
        description: req.body.description,
        idUser: req.user.user
    };

    try{
        const result = await note.create(data);

        if(!result) {
            return res.status(400).json({
                msg: 'No se pudo almacenar los datos de Nota'
            });
        }

        res.status(201).json({
            msg: 'Nota creada exitosamente'
        })
    
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'Error al crear la nota'
        })
    }
}

const updateNote = async (req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ msg: 'El id es obligatorio'});
    }

    const data = {
        idNote: id,
        title: req.body.title,
        description: req.body.description,
    };

    try{
        const result = await note.updateById(data);

        if (!result) {
            return res.status(400).json({
                msg: 'No se pudo actualizar los datos de Nota'
            });
        }

        res.status(201).json({
            msg: 'Nota actualizada correctamente'
        })

    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'Error al actualizar la nota'
        })
    }
}

const deleteNote = async (req, res) => {
    const { id } = req.params;

    try{
        const result = await note.delete(id);

        if (!result) {
            return res.status(400).json({
                msg: 'No se pudo eliminar la Nota'
            });
        }

        res.status(201).json({
            msg: 'Nota eliminada'
        })
    }catch(error){
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo eliminar la nota'
        })
    }
}



module.exports = {
    createNote,
    getAllNoteByUser,
    updateNote,
    deleteNote
}