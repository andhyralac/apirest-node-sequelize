const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validateFields } = require('../middlewares/validate-fields');
const { login } = require('../controllers/login.controller');

router.post('/', [
    check('email', 'El correo electronico es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
], login);


module.exports = router;