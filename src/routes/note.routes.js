const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { validateJWT } = require('../middlewares/validate-JWT');
const {
    noteExists
} = require('../helpers/db-validators');

const { 
    createNote,
    getAllNoteByUser,
    updateNote,
    deleteNote
} = require('../controllers/note.controller');


const router = Router();

router.get('/', [
    validateJWT,
    validateFields
],getAllNoteByUser);

router.post('/', [
    validateJWT,
    check('title', 'El campo titulo es obligatorio').not().isEmpty(),
    check('description', 'El campo descripcion es obligatorio').not().isEmpty(),
    validateFields
], createNote);

router.put('/:id', [
    validateJWT,
    check('id').custom(noteExists),
    check('title', 'El campo titulo es obligatorio').not().isEmpty(),
    check('description', 'El campo descripcion es obligatorio').not().isEmpty(),
    validateFields
], updateNote);

router.delete('/:id', [
    validateJWT,
    check('id').custom(noteExists),
    validateFields
],deleteNote);

module.exports = router;