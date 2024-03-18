const router = require('express').Router()
const  pool =require('../config/db')

router.post('/dashboard/censusForm',async(req,res)=>{
    try {
        const {Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8} =req.body;

        const response =await pool.query("INSERT INTO censustally (q1,q2,q3,q4,q5,q6,q7,q8) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",[Q1,Q2,Q3,Q4,Q5,Q6,Q7,Q8])
        res.status(200).json({
            message : response.rows[0]
        })

    } catch (error) {
        res.status(500).send('Server Error');    
    }
  
})





module.exports=router;
