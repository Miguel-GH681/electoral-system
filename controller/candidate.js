const cloudinary = require('cloudinary').v2
const { Op } = require('sequelize');
const Candidate = require('../models/candidate');
const AcademicQualification = require('../models/academic_qualification');
const sequelize = require('../database/config');
const UserApp = require('../models/user_app');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const postCandidate = async (req, res) => {
  try {
    const { membership_number, campaign_id, description, photo, candidate_position_id, diplomas } = req.body;

    const existingUser = await UserApp.findOne({
      where: {membership_number}
    });
    if(!existingUser){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe en la base de datos'
      });
    }

    const existingCandidate = await Candidate.findOne({
      where: {
        [Op.and]: [
          { membership_number },
          { campaign_id }
        ]
      }
    });
    if (existingCandidate) {
      return res.status(400).json({
        ok: false,
        msg: 'El \'membership_number\' ya está registrado en esta campaña'
      });
    }

    const result = await cloudinary.uploader.upload(photo, {
      transformation: [
        {
          width: 213, heigth: 240, crop: "fill"
        }
      ]
    });    
    const candidate = new Candidate({ membership_number, campaign_id, description, photo: result.secure_url, candidate_position_id });
    const newCandidate = await candidate.save();

    if(diplomas.length > 0){
      for(let i = 0; i < diplomas.length; i++){
        const academic_qualification = new AcademicQualification({
          title: diplomas[i].title,
          description: diplomas[i].description,
          graduation_year: diplomas[i].graduation_year,
          institution: diplomas[i].institution,
          candidate_id: newCandidate.candidate_id
        });

        await academic_qualification.save()
      }
    }

    res.json({
        ok: true,
        msg: candidate
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
};

const putCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const { membership_number, campaign_id, description, photo, candidate_position_id } = req.body;
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return res.status(404).json({
        ok: false,
        msg: 'Candidato no encontrado'
      });
    }
    candidate.membership_number = membership_number;
    candidate.campaign_id = campaign_id;
    candidate.description = description;
    candidate.photo = photo;
    candidate.candidate_position_id = candidate_position_id;
    await candidate.save();
    res.json({
        ok: true,
        msg: candidate
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
}

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await Candidate.findByPk(id);
    if (!candidate) {
      return res.status(404).json({
        ok: false,
        msg: 'Candidato no encontrado'
      });
    }
    await candidate.destroy();
    res.json({
        ok: true,
        msg: 'Candidato eliminado'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
};

const getEngineers = async (req, res) => {
  try {
    const candidates = await sequelize.query('select * from get_candidates()', {
      type: sequelize.QueryTypes.SELECT
    });
    res.json({
      ok: true,
      msg: candidates
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
};

const getCandidatePositions = async (req, res)=>{
  try {
    const candidatePositions = await sequelize.query('select * from get_positions()', {
      type: sequelize.QueryTypes.SELECT
    });
    res.json({
      ok: true,
      msg: candidatePositions
    });    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
}

const getMeasures = async (req, res)=>{
  try {
    const measures = await sequelize.query('select * from get_measures()', {
      type: sequelize.QueryTypes.SELECT
    });
    res.json({
      ok: true,
      msg: measures
    });    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
  }
}

module.exports = {
  postCandidate,
  putCandidate,
  deleteCandidate,
  getEngineers,
  getCandidatePositions,
  getMeasures
};