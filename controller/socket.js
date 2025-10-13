const Vote = require('../models/vote');

const saveVote = async (payload)=>{
    try {
        const vote = new Vote(payload);
        await vote.save();
        return true;
    } catch (error) {
        return false;
    }
}

module.exports = {
    saveVote
}