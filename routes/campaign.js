const { Router } = require('express');
const { postCampaign, putCampaign, deleteCampaign, getCampaigns, getCandidatesByCampaign } = require('../controller/campaign');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRole } = require('../middlewares/validar-role');
const router = Router();

router.post('/', [
    check('title', 'El \'title\' es obligatorio').not().isEmpty(),
    check('description', 'El \'description\' es obligatorio').not().isEmpty(),
    check('status', 'El \'status\' es obligatorio').not().isEmpty(),
    check('duration', 'El \'duration\' es obligatorio').not().isEmpty(),
    check('measure_id', 'El \'measure_id\' es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRole
], postCampaign);
router.put('/:id', [
    check('title', 'El \'title\' es obligatorio').not().isEmpty(),
    check('description', 'El \'description\' es obligatorio').not().isEmpty(),
    check('status', 'El \'status\' es obligatorio').not().isEmpty(),
    check('duration', 'El \'duration\' es obligatorio').not().isEmpty(),
    check('measure_id', 'El \'measure_id\' es obligatorio').not().isEmpty(),
    validarCampos,
    validarRole
], putCampaign);
router.delete('/:id', deleteCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCandidatesByCampaign);

module.exports = router;