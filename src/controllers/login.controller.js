const bcryptjs = require('bcryptjs');

const { User } = require('../models');
const { generateJWT } = require('../helpers/generate-JWT');


const login = async (req, res) => {
    const { email, password } = req.body;

    try{
        
        const user = new User();
        const dataUser = await user.getUserByEmail(email);
    
        if (!dataUser || dataUser.status_user !== 1) {
            return res.status(400).json({
                msg: 'Usuario/ Contraseña no son correctos - correo'
            });
        }
    
        const validPassword = bcryptjs.compareSync(password, dataUser.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario/ Contraseña no son correctos - password'
            });
        }

        const token = generateJWT(dataUser.id_user, dataUser.name);
    
        res.json({
            token
        });

    }catch(error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}



module.exports = {
    login
}