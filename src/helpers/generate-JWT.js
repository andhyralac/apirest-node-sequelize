const jwt = require('jsonwebtoken');

const generateJWT = (id, name) => {

    const payload = { 
        id, 
        name
     }

     try{
        const token = jwt.sign(payload, process.env.SECRET_PRIVATE_KEY, {
            expiresIn: '6h'
        });

        return token;

     } catch(error) {
        console.log(error);
        return 'No se puede generar el token';
     }
}


module.exports = {generateJWT};