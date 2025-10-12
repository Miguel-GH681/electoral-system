const { Op } = require('sequelize');

const Campaign = require('../models/campaign');
const sequelize = require('../database/config');


const postCampaign = async (req, res)=>{
    try {
        const { title, description, status, duration, measure_id, votes} = req.body;
        const campaign = new Campaign({ title, description, status, duration, measure_id, votes});
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
        const { title, description, status, duration, measure_id, votes} = req.body;
        const campaign = await Campaign.findByPk( id );
        if(!campaign){
            return res.status(404).json({
                ok: false,
                msg: 'Campaña no encontrada'
            });
        } 
        campaign.title = title;
        campaign.description = description;
        campaign.status = status;
        campaign.duration = duration;
        campaign.measure_id = measure_id;
        campaign.votes = votes;
        await campaign.save();

        res.json({
            ok: true,
            msg: campaign
        });
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
        const campaigns = await Campaign.findAll();
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

    res.json({
      ok: true,
      msg: {
        campaign,
        candidates
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
};

module.exports = {
    postCampaign,
    putCampaign,
    deleteCampaign,
    getCampaigns,
    getCandidatesByCampaign
}