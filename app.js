//install express
//install nodemon
//install socket.io

const express=require("express");
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
    // console.log(socket);
    console.log(`${socket.id} connected`);

    socket.on("mousedown" , function(lineObject){
        socket.broadcast.emit("md", lineObject);
        // console.log("mousedown event fired !!");
        // console.log(lineObject);
    })

    socket.on("mousemove" , function(lineObject){
        socket.broadcast.emit("mm", lineObject);
        // console.log("mousemove event fired !!");
        // console.log(lineObject);
    })


});


app.use(express.static("public"));
let port=process.env.PORT || 3000;

http.listen(port , function(){
    console.log("started at"+" "+ port);

})