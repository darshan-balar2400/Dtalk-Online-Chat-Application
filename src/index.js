const app = require("./app");
const http = require('http');
const socket = require("socket.io");
const Filter = require("bad-words");
const {generateMessage,generateLocationMessage} = require("../src/util/generateMessage");
const {addUser,removeUser,getUser,getUserInRoom,getAllRooms} = require("../src/util/user");

const server = http.createServer(app);
const io = socket(server);

const port = process.env.PORT || 8000;

io.on("connection",(socket) => {
    console.log("connected !")
    
    io.emit("getAllRooms",getAllRooms());

    socket.on("join",(username,room,callback) => {
        
        const {error,user} = addUser({id:socket.id,username,room});

        if(error){
           return callback(error);
        }

        socket.join(user.room);
        socket.emit("message",generateMessage("DTalk","Welcome to our chat Application !"));
        socket.broadcast.to(user.room).emit("message",generateMessage(user.username,` ${user.username} Is Joined !`));
        
        io.to(user.room).emit("getAlllUser",{
            room:user.room,
            users:getUserInRoom(user.room)
        });
    });

    socket.on("sendMessage",(msg,callback) => {
        const user = getUser(socket.id);

        const filter = new Filter();
        
        if(filter.isProfane(msg)){
            callback("Not Valid Input !");
        }

        io.to(user.room).emit("message",generateMessage(user.username,msg));
        callback();
    });

    socket.on("sendLocation",(data,callback) =>{
        const user = getUser(socket.id);

        io.to(user.room).emit("locationMessage",generateLocationMessage(user.username,`https://google.com/maps?q=${data.latitude},${data.longitude}`))
        callback();
    });

    socket.on('disconnect',() => {
        const user = removeUser(socket.id);
        
        if(user){
            io.to(user.room).emit("message",generateMessage(user.username,`${user.username} is left !`))
        }
    });
   
});

server.listen(port,(err) => {
    if(err) return err;
    console.log(`Listening on port ${port}`);
});