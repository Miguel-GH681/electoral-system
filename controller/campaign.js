const Campaign = require('../models/campaign');
const Measure = require('../models/measure');
const CampaignState = require('../models/campaign_state');
const sequelize = require('../database/config');
const { timeRemaining, currentDate } = require('../helpers/date-manager');

const postCampaign = async (req, res)=>{
    try {
        const { title, description, campaign_state_id, duration, measure_id, votes} = req.body;
        const campaign = new Campaign({ title, description, campaign_state_id, duration, measure_id, votes});
        await campaign.save();
        res.json({
            ok: true,
            msg: campaign.campaign_id
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const putCampaign = async (req, res)=>{
    try {
        const { id } = req.params;
        const { campaign_state_id } = req.body;
        const campaign = await Campaign.findByPk( id );
        if(!campaign){
            return res.status(404).json({
                ok: false,
                msg: 'Campaña no encontrada'
            });
        } 

        const measure = await Measure.findByPk( campaign.campaign_state_id );
        if(!measure){
          return res.status(404).json({
              ok: false,
              msg: 'Medida no encontrada'
          });
        }

        if(((campaign.campaign_state_id == 2 || campaign.campaign_state_id == 3 || campaign.campaign_state_id == 4) && campaign_state_id == 1) ||
           (campaign.campaign_state_id == 4 && (campaign_state_id == 3 || campaign_state_id == 2 || campaign_state_id == 1))){
          return res.status(400).json({
            ok: false,
            msg: 'No se puede realizar el cambio de estado debido a politicas de la aplicacion'
          })
        }

        campaign.campaign_state_id = campaign_state_id;
        if(!campaign.init_date){          
          campaign.init_date = currentDate();
          await campaign.save();
          res.json({
              ok: true,
              msg: timeRemaining(campaign.init_date, campaign.duration, measure)
          });
        } else{
          await campaign.save();
          res.json({
              ok: true,
              msg: null
          });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const deleteCampaign = async (req, res)=>{
    try {
        const { id } = req.params;
        const campaign = await Campaign.findByPk( id );
        if(!campaign){
            return res.status(404).json({
                ok: false,
                msg: 'Campaña no encontrada'
            });
        }
        await campaign.destroy();

        res.json({
            ok: true,
            msg: 'Campaña eliminada'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const getCampaigns = async (req, res)=>{
    try {
        const campaigns = await sequelize.query('select * from get_campaigns()',
            {
                type: sequelize.QueryTypes.SELECT
            }
        );
        res.json({
            ok: true,
            msg: campaigns
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const getCandidatesByCampaign = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await Campaign.findByPk(id);
    if (!campaign) {
      return res.status(404).json({
        ok: false,
        msg: 'Campaña no encontrada'
      });
    }

    const candidates = await sequelize.query('select * from get_candidates_by_campaign(:campaign_id)',
        {
            replacements: { campaign_id: id },
            type: sequelize.QueryTypes.SELECT
        }
    );

    const measure = await Measure.findByPk(campaign.measure_id);
    if (!measure) {
      return res.status(404).json({ ok: false, msg: 'Medida no encontrada' });
    }

    res.json({
      ok: true,
      msg: {
        campaign,
        endDate: timeRemaining(campaign.init_date, campaign.duration, measure),
        candidates
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
};

const startCampaign = async (req, res) => {
  try {
    const { campaign_id } = req.params;
    const campaign = await Campaign.findByPk(campaign_id);

    if (!campaign) {
      return res.status(404).json({ ok: false, msg: 'Campaña no encontrada' });
    }

    const measure = await Measure.findByPk(campaign.measure_id);
    if (!measure) {
      return res.status(404).json({ ok: false, msg: 'Medida no encontrada' });
    }

    return res.json({
      ok: true,
      endDate: timeRemaining(campaign.init_date, campaign.duration, measure)
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador' });
  }
};

const getCampaignState = async (req, res)=>{
  try {
    const campaignState = await CampaignState.findAll();

    res.json({
      ok: true,
      msg: campaignState
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador' });
  }
}

const getVoteReport = async (req, res)=>{
  try {
    const {campaign_id} = req.params;

    const report = await sequelize.query('select * from get_vote_report(:campaign_id)',
      {
          replacements: { campaign_id },
          type: sequelize.QueryTypes.SELECT
      }
    );

    res.json({
      ok:true,
      msg: report
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador' });
  }
}

const getResult = async (req, res)=>{
  try {
    const { campaign_id } = req.params;
        const campaign_result = await sequelize.query('select * from get_result(:campaign_id)',
      {
          replacements: { campaign_id },
          type: sequelize.QueryTypes.SELECT
      }
    );

    res.json({
      ok:true,
      msg: campaign_result
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, msg: 'Comuníquese con el administrador' });
  }
}

module.exports = {
    postCampaign,
    putCampaign,
    deleteCampaign,
    getCampaigns,
    startCampaign,
    getCandidatesByCampaign,
    getCampaignState,
    getVoteReport,
    getResult
}