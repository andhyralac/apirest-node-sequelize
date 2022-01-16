const { encryptPassword } = require('../helpers/encrypt-Password');
const { generateJWT } = require('../helpers/generate-JWT');
const { User } = require('../models');


const createUser = async (req, res) => {
    const data = { 
        name: req.body.name, 
        surname: req.body.surname, 
        nickName: req.body.nickName, 
        address: req.body.address, 
        email: req.body.email, 
        password: req.body.password, 
        image: req.body.image || ''
    };

    data.password = encryptPassword(data.password);

    try{
        const user = new User();
        const dataUser = await user.create(data);

        const jwtUser = generateJWT(dataUser.user, dataUser.name);

        return res.status(201).json({
            token: jwtUser
        });

    }catch(error){
        console.log(error);
    }
}




module.exports = {
    createUser
}