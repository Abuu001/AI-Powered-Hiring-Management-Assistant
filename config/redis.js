require('dotenv').config({path : "./dev.env"});
let redis = require('redis');
const REDIS_PORT1 = process.env.REDIS_PORT;
const REDIS_URL=process.env.REDIS_URL; 

let client = redis.createClient( REDIS_URL || process.env.REDISTOGO_URL || REDIS_PORT1);

// client.on('error',(error)=>{
//     console.log(error)
// })

client.on("connect", () => {
    console.log("Connected to Redis.... ");
});
  
module.exports= client;



// require('dotenv').config({path : "../.env"})
// let redis = require('redis');
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

// let client = redis.createClient(REDIS_PORT);

// // client.on('error',(error)=>{
// //     console.log(error)
// // })

// client.on("connect", () => {
//     console.log("Connected to Redis.... ");
// });
  
// module.exports= client;