const { Router, response } = require('express');
const { postUser, login, renewToken } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/new', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('full_name', 'El \'full_name\' es obligatorio').not().isEmpty(),
    check('email', 'El \'email\' es obligatorio').isEmail(),
    check('dpi', 'El \'dpi\' es obligatorio').not().isEmpty(),
    check('birthdate', 'El \'birthdate\' es obligatorio').not().isEmpty(),
    check('password', 'El \'password\' es obligatorio').not().isEmpty(),
    validarCampos
], postUser);
router.post('/', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('dpi', 'El \'dpi\' es obligatorio').not().isEmpty(),
    check('birthdate', 'El \'birthdate\' es obligatorio').not().isEmpty(),
    check('password', 'El \'password\' es obligatorio').not().isEmpty(),
    validarCampos
], login);

module.exports = router;