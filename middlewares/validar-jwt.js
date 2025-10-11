const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next)=>{
    try {
        const token = req.headers['x-token'];
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la peticion'
            });
        }

        const { membership_number } = jwt.verify(token, process.env.JWT_KEY);
        req.membership_number = membership_number;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }
}

module.exports = {
    validarJWT
}