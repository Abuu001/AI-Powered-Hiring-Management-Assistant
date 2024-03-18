const router = require('express').Router()
const  pool =require('../config/db')

router.post('/dashboard/censusQA',async(req,res)=>{
    try {
        const {firstName,surName,dob,age,idNo,certNo} =req.body;

        const response =await pool.query("INSERT INTO persondetails(firstname,surname,dob,age,idno,certno) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[firstName,surName,dob,age,idNo,certNo])
        res.status(200).json({
            message : response.rows[0]
        })

    } catch (error) {
        res.status(500).send('Server Error');    
    }
  
})





module.exports=router;
