const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validateJWT = async (req, res, next) => {
    const token = req.header('token-app');

    if(!token) return res.status(400).json({
        msg: 'No hay token en la peticion'
    });

    try{
        const { id } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

        const user = new User();
        const dataUser = (await user.getUser(id)).toJSON();

        if(!dataUser) return res.status(401).json({
            msg: 'Token no válido - usuario no existe'
        })

        if (dataUser.status_user === 0) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado false'
            })
        }

        req.user = dataUser;
        next();

    } catch(error) {
        console.log(error);
        res.status(500).json({
            msg: 'Token no válido comunicarse con el administrador - validateJWT'
        });
    }
}



module.exports = {validateJWT};