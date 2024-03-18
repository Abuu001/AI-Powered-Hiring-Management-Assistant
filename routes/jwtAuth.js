const router = require('express').Router()
const pool = require('../config/db')
const bcrypt = require('bcrypt');
const jwtGenerator=require('../utils/jwtGenerator')
var validator = require('validator');
const auth =require('../middleware/authorization')
//reqistering
router.post('/register', async (req,res)=>{
    try {
        const {name,email,password} = req.body;
        const user = await  pool.query('SELECT * FROM users WHERE user_email=$1',[email])

        
        if(user.rows.length !==0){
            return  res.status(401).json({
                message : ' User already exists !!'
            })
        }

        if(!name || !password  ){
            return  res.status(401).json({
                message : 'Insert missing  fields !!'
            })
        }

        const isEmailValid = validator.isEmail(email);

        //checking if email is valid
        if(!isEmailValid){
            return res.status(401).json({
                message: 'Invalid Email'
            })
        }
     
        //hashing passwords
        const saltRounds=10;
        const salt= await bcrypt.genSalt(saltRounds)
        const bcryptPassword=  await bcrypt.hash(password,salt)
        
        const newUser = await pool.query("INSERT INTO users (user_name,user_email,user_password) VALUES($1,$2,$3) RETURNING *",[name,email,bcryptPassword])

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.status(201).json({
            data: {
                length : newUser.rows.length,
                result  : newUser.rows[0]
            }, 
            token
        } )
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message : 'Server Error'})
    }
})

//login route
router.post('/login',async(req,res)=>{
    try {
        const{password,email} =req.body;
        const user =await pool.query("SELECT * FROM users WHERE user_email = $1 ",[email])
 
        if(user.rows.length ===0 ){
            return res.status(401).json({
                message: 'Password or Email is incorrect'
            })
        }

        const validPassword = await bcrypt.compare(password,user.rows[0].user_password)

        if(!validPassword){
            return res.status(401).json({
                message : "Password or Email is incorrect"
            })
        }

        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
    
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

router.get('/is-verify',auth,async (req,res)=>{
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

module.exports =router