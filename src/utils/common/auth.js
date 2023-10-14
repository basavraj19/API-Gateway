const bycrpt=require('bcrypt');

const jwt =require('jsonwebtoken');

const {Serverconfig}=require('../../config');

function verifyPassword(plainPassword,encyptedPassword)
{
   try {
    return bycrpt.compareSync(plainPassword,encyptedPassword);
   } catch (error) {
     throw error;
   }
}

function generateToken(input)
{
     try {
        return jwt.sign(input,Serverconfig.JWT_SECRET_KEY,{expiresIn : Serverconfig.JWT_EXPIRY});
     } catch (error) {
        console.log(error);
        throw error;
     }
}

function verifyToken(token)
{
    try {
        var decoded = jwt.verify(token, Serverconfig.JWT_SECRET_KEY);
        return decoded;
    } catch (error) {
        throw error;
    }
}

module.exports ={
    verifyPassword,
    generateToken,
    verifyToken
}