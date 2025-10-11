const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const { getJWT } = require('../helpers/jwt');
const User = require('../models/user_app');

const postUser = async (req, res)=>{
    try {
        const { membership_number, full_name, email, dpi, birthdate, password, role_id } = req.body;
        const formattedBirthdate = moment(birthdate, 'YYYY-MM-DD').toDate();

        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    {email},
                    {membership_number}
                ]
            }
        });
        if(userExists){
            return res.status(400).json({ok: false, msg: 'El correo o el número de colegiado ya se encuentra registrado'});
        }

        const user = new User({ membership_number, full_name, email, dpi, birthdate: formattedBirthdate, password, role_id });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
        await user.save();

        const token = await getJWT( user.membership_number, user.role_id );

        res.json({
            ok: true,
            msg: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }    
}

const login = async (req, res = response)=>{
    try {
        const {membership_number, dpi, birthdate, password} = req.body;
        const formattedBirthdate = moment(birthdate, 'YYYY-MM-DD').toDate();
        
        const user = await User.findOne({
            where: {
                [Op.and]:[
                    {membership_number},
                    {dpi},
                    {birthdate: formattedBirthdate}
                ]
            } 
        });
        if(!user){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, user.password );
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        const token = await getJWT( user.membership_number, user.role_id );
        return res.json({
            ok: true,
            msg: user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }  
}


module.exports = {
    postUser,
    login
}