const redisClient =require('../config/redis');

exports.saveCallId=(key,value)=>{
    return new Promise((resolve,reject)=>{
        redisClient.set(key,JSON.stringify(value),'ex',86400,(err,res)=>{
            if(err){
                reject(err)
            }
            resolve(res)
        })
    })
}

exports.getCallId=(key)=>{
    return new Promise((resolve,reject)=>{
        redisClient.get(key,(err,res)=>{
            if(err){
                reject(err);
            }
            resolve(JSON.parse(res));
        })
    })
}

