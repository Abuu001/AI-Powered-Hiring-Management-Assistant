const express = require('express')
const app = express()
require('dotenv').config({path : './config/dev.env'})
const chalk = require('chalk')
const cors =require('cors')
const path=require('path')
const socketManager= require('./controllers/socketManager')
const routes = require('./routes/routes')
const http = require('http')
const server = http.createServer(app)

//middleware
app.use(cors())
app.use(express.json()) // helps us access req.body

const io = require("socket.io")(server, {
    cors: {
      origin: ["http://localhost:3000","https://googlemeetclone123.herokuapp.com","http://localhost:3002"],
      methods: ["GET", "POST"]
    }
  });

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'./frontend/build')))
}

app.use([
    cors(),
    express.json(),
    routes
])

//routes
//register and login routes
app.use('/auth',require('./routes/jwtAuth'))
//dashboard route
app.use('/dashboard',require('./routes/dashboard'))
app.use('/count',require('./routes/censusData'))
app.use('/count',require('./routes/censusForm'))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend/public/index.html"))
})
io.on('connection',socketManager);
const PORT=process.env.PORT;
app.listen(PORT,()=>console.log(`Server ${chalk.yellowBright(`running`)} on ${chalk.cyan(`port`)} ${chalk.red(PORT)}`))