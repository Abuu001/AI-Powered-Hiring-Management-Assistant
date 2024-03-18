const jwt = require('jsonwebtoken')

module.exports=(req,res,next)=>{
    try {
        const jwtToken=req.header('token');
 
        if(!jwtToken){
            return res.status(403).json({
                message : "Unauthorized"
            })
        }

        const payload=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY)
        req.user = payload.user;
        next();
    } catch (error) {
        console.log(error.message);
        return   res.status(403).json({
            message : "Unauthorized"
        })
    }
}