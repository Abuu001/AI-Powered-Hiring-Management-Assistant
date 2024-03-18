const jwt = require('jsonwebtoken')

const jwtGenerator=(user_id)=>{
    const payload={
        user : user_id
    }

    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : '1h'})
}

module.exports=jwtGenerator;