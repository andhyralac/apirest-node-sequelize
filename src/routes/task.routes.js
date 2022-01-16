const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { taskExists } = require('../helpers/db-validators');
const { validateJWT } = require('../middlewares/validate-JWT');
const { validateFields } = require('../middlewares/validate-fields');

const {
    getAllTaskByUser,
    createTask,
    updateTask,
    deleteTask
} = require('../controllers/task.controller');

router.get('/', [
    validateJWT,
    validateFields
], getAllTaskByUser);

router.post('/', [
    validateJWT,
    check('description', 'La descripcion de la tarea es obligatorio').not().isEmpty(),
    check('deadline', 'El campo de fecha es obligatorio').not().isEmpty(),
    validateFields
], createTask);

router.put('/:id', [
    validateJWT,
    check('id').custom(taskExists),
    check('description', 'La descripcion de la tarea es obligatorio').not().isEmpty(),
    check('deadline', 'El campo de fecha es obligatorio').not().isEmpty(),
    validateFields
], updateTask);

router.delete('/:id', [
    validateJWT,
    check('id').custom(taskExists),
    validateFields
], deleteTask);

module.exports = router;