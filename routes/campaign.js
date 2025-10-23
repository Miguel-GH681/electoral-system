const { Router } = require('express');
const { 
    postCampaign, 
    putCampaign, 
    deleteCampaign, 
    getCampaigns, 
    getCandidatesByCampaign, 
    startCampaign, 
    getCampaignState, 
    getVoteReport,
    getResult
} = require('../controller/campaign');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarRole } = require('../middlewares/validar-role');
const router = Router();

router.get('/state', validarJWT, getCampaignState);
router.post('/', [
    check('title', 'El \'title\' es obligatorio').not().isEmpty(),
    check('description', 'El \'description\' es obligatorio').not().isEmpty(),
    check('campaign_state_id', 'El \'campaign_state_id\' es obligatorio').not().isEmpty(),
    check('duration', 'El \'duration\' es obligatorio').not().isEmpty(),
    check('measure_id', 'El \'measure_id\' es obligatorio').not().isEmpty(),
    validarCampos,
    validarJWT,
    validarRole
], postCampaign);
router.put('/:id', [
    validarRole,
    validarJWT
], putCampaign);
router.delete('/:id', deleteCampaign);
router.get('/', getCampaigns);
router.get('/:id', getCandidatesByCampaign);
router.get('/start/:campaign_id', validarJWT, startCampaign);
router.get('/report/:campaign_id', validarJWT, getVoteReport);
router.get('/result/:campaign_id', validarJWT, getResult);
module.exports = router;