const { Router } = require('express');
const { postCandidate, putCandidate, deleteCandidate, getEngineers, getCandidatePositions, getMeasures } = require('../controller/candidate');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRole } = require('../middlewares/validar-role');

const router = Router();

router.post('/', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('campaign_id', 'El \'campaign_id\' es obligatorio').not().isEmpty(),
    check('description', 'El \'description\' es obligatorio').not().isEmpty(),
    check('photo', 'El \'photo\' es obligatorio').not().isEmpty(),
    check('candidate_position_id', 'El \'candidate_position_id\' es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRole
], postCandidate);
router.put('/:id', [
    check('membership_number', 'El \'membership_number\' es obligatorio').not().isEmpty(),
    check('campaign_id', 'El \'campaign_id\' es obligatorio').not().isEmpty(),
    check('description', 'El \'description\' es obligatorio').not().isEmpty(),
    check('photo', 'El \'photo\' es obligatorio').not().isEmpty(),
    check('candidate_position_id', 'El \'candidate_position_id\' es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRole
], putCandidate);
router.get('/', validarJWT, getEngineers);
router.get('/candidate-positions', validarJWT, getCandidatePositions);
router.get('/measures', validarJWT, getMeasures);
router.delete('/:id', validarJWT, deleteCandidate);

module.exports = router;