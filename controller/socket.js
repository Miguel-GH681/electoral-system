const Vote = require('../models/vote');
const Candidate = require('../models/candidate');
const Campaign = require('../models/campaign');
const sequelize = require('../database/config');
const { Op } = require('sequelize');

const saveVote = async (payload)=>{
    try {        
        const { candidate_id, voter_id, candidate_position_id, vote_date } = payload;
        const voteExists = await Vote.findOne({
            where: {
                [Op.and]: [
                    {voter_id},
                    {candidate_position_id}
                ]
            }
        });
       
        if(voteExists){
            return false
        }

        const candidate = await Candidate.findOne({where: {membership_number: candidate_id}});
        const campaign = await Campaign.findByPk(candidate.campaign_id);            
        const votes = await sequelize.query('select * from get_vote_report(:campaign_id)',
            {
                replacements: { campaign_id: 4 },
                type: sequelize.QueryTypes.SELECT
            }
        );

        if(votes.length >= campaign.votes){
            campaign.campaign_state_id = 4;
            await campaign.save();
            return false;
        }

        const vote = new Vote({candidate_id, voter_id, candidate_position_id, vote_date});
        await vote.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    saveVote
}