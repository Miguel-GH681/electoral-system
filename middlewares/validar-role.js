const jwt = require('jsonwebtoken');

const validarRole = (req, res, next)=>{
    try {
        const token = req.headers['x-token'];
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la peticion'
            });
        }
        
        const { role_id } = jwt.verify(token, process.env.JWT_KEY);
        if(role_id != 1){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta accion'
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
}

module.exports = {
    validarRole
}