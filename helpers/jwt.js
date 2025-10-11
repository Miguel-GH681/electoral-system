const jwt = require('jsonwebtoken');

const getJWT = ( membership_number, role_id )=>{
    return new Promise((resolve, reject)=>{
        const payload = { membership_number, role_id };        
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '6h'
        }, (error, token)=>{
            if(error){
                reject('No se pudo generar el JWT');
            } else{
                resolve( token );
            }
        });
    });
}

const validateJWT = (token)=>{
    try {
        const { membership_number } = jwt.verify(token, process.env.JWT_KEY);
        return [true, membership_number];
    } catch (error) {
        return [false, ''];
    }
}

module.exports = {
    getJWT,
    validateJWT
}