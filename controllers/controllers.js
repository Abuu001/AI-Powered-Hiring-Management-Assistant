const {saveCallId,getCallId} = require('../models/models')

exports.saveCallId=async(req,res)=>{
    try {
        const {id,signalData} =req.body;
        await  saveCallId(id,signalData);

        res.status(200).send(true)
    } catch (error) {
        res.status(400).send( error.message)
    }
}

exports.getCallId=async(req,res)=>{
    try {
        const {id} =req.params;
        const code = await  getCallId(id)

        res.status(200).send({code})
    } catch (error) {
        res.status(400).send( error.message)
    }
}