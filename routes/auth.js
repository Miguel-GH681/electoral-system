const { Router, response } = require('express');
const { postUser, login, getUsers, putUser, deleteUser } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRole } = require('../middlewares/validar-role');
const router = Router();

router.post('/', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('full_name', 'El \'full_name\' es obligatorio').not().isEmpty(),
    check('email', 'El \'email\' es obligatorio').isEmail(),
    check('dpi', 'El \'dpi\' es obligatorio').not().isEmpty(),
    check('birthdate', 'El \'birthdate\' es obligatorio').not().isEmpty(),
    check('password', 'El \'password\' es obligatorio').not().isEmpty(),
    validarCampos
], postUser);
router.post('/login', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('dpi', 'El \'dpi\' es obligatorio').not().isEmpty(),
    check('birthdate', 'El \'birthdate\' es obligatorio').not().isEmpty(),
    check('password', 'El \'password\' es obligatorio').not().isEmpty(),
    validarCampos
], login);
router.get('/', [validarJWT, validarRole], getUsers);
router.put('/:membership_number', [validarJWT, validarRole], putUser);
router.delete('/:membership_number', [validarJWT, validarRole], deleteUser);

module.exports = router;