const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { getJWT } = require('../helpers/jwt');
const User = require('../models/user_app');

const postUser = async (req, res)=>{
    try {
        const { membership_number, full_name, email, dpi, birthdate, password, role_id } = req.body;

        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    {dpi},
                    {email},
                    {membership_number}
                ]
            }
        });
        if(userExists){
            return res.status(400).json({ok: false, msg: 'El correo o el número de colegiado ya se encuentra registrado'});
        }

        const user = new User({ membership_number, full_name, email, dpi, birthdate, password, role_id });

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

const login = async (req, res)=>{
    try {
        const {membership_number, dpi, birthdate, password} = req.body;
        
        const user = await User.findOne({
            where: {
                [Op.and]:[
                    {membership_number},
                    {dpi},
                    {birthdate}
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

const getUsers = async (req, res)=>{
    try {
        const users = await User.findAll();

        return res.json({
            ok: true,
            msg: users
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const putUser = async (req, res)=>{
    try {
        const { membership_number } = req.params;
        const { full_name, email, dpi, birthdate, password, role_id } = req.body;

        const userExists = await User.findOne({
            where: {
                [Op.or]: [
                    {dpi},
                    {email}
                ]
            }
        });
        if(userExists){
            return res.status(400).json({ok: false, msg: 'El correo o el número de colegiado ya se encuentra registrado'});
        }

        const [updated] = await User.update({full_name, email, dpi, birthdate, password, role_id}, {where: {membership_number}});

        if(updated === 0){
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            })
        }

        res.json({ok: true, msg: "Usuario actualizado correctamente"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}

const deleteUser = async (req, res) => {
    try{
        const { membership_number } = req.params;
        const deleted = await User.destroy({where: {membership_number}});

        if(deleted === 0){
            return res.status(404).json({
                ok: true,
                msg: "Usuario no encontrado"
            })
        }

        res.json({ok: true, msg: "Usuario eliminado correctamente"})
    } catch(error){
        console.log(error);
        return res.status(500).json({ok: false, msg: 'Comuníquese con el administrador'});
    }
}



module.exports = {
    postUser,
    login,
    getUsers,
    putUser,
    deleteUser
}