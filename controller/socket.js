const Vote = require('../models/vote');
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