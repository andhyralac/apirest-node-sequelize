const { Router } = require('express');
const { check } = require('express-validator');

const { emailExists } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields')

const router = Router();

const {
    createUser
} = require('../controllers/user.controller');

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('surname', 'Los apellidos son obligatorio').not().isEmpty(),
    check('nickName', 'El nick name  es obligatorio').not().isEmpty(),
    check('email', 'El correo debe ser valido').isEmail(),
    check('email').custom(emailExists),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('address', 'La direccion es obligatoria').not().isEmpty(),
    validateFields
], createUser);

module.exports = router;