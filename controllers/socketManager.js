module.exports=(socket)=>{
    try {
        console.log("Socket Connected");

        socket.on('code',(data,callback)=>{
            socket.broadcast.emit('code',data)
        })
        
    } catch (error) {
        console.error(error.message)
    }
}