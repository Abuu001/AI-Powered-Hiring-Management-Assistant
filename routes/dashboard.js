const router = require('express').Router()
const  pool =require('../config/db')
const auth =require('../middleware/authorization')

router.get('/',auth, async(req,res)=>{
    try {
      //  res.json(req.user)
        const user = await pool.query("SELECT user_id,user_name,user_email,created_at FROM users WHERE user_id=$1",[req.user])
         res.json(user.rows[0])
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');    
    }
})

module.exports=router;