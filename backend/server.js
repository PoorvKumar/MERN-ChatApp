const express=require('express');
const app=express();

const connectDB = require('./config/db');

const dotenv=require("dotenv"); //dotenv paackaage so that port stored in backend we do not show which port we are using
const colors=require('colors');

const errorMiddlware=require('./middleware/error');

const { chats }=require("./data/data");

dotenv.config(); //to use .env 

app.use(express.json()); //to accept JSON data

//Connect to MongoDB database
connectDB();

//routes
const userRoutes=require('./routes/userRoutes');
const chatRoutes=require('./routes/chatRoutes');
const messageRoutes=require('./routes/messageRoutes');

app.get('/',(req,res)=>
{
    res.send("API is running...");
});

//routing
app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

//errro middleware
app.use(errorMiddlware.notFound);
app.use(errorMiddlware.errorHandler);

const PORT=process.env.PORT || 3000;

const server=app.listen(PORT,console.log(`Server listening on PORT ${PORT}`.blue.bold));

//socket.io
const io=require('socket.io')(server,
    {
        pingTimeout: 60000,
        cors:
        {
            origin: "http://localhost:3000"
        }
    });

io.on("connection",(socket)=>
{
    console.log("Connected to Socket.io");

    socket.on("setup",(userData)=>
    {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat",(room)=>
    {
        socket.join(room);
        console.log(`User Joined Room : ${room}`);
    });

    socket.on("typing",(room)=>socket.in(room).emit("typing"));
    socket.on("stop typing",(room)=>socket.in(room).emit("stop typing"));

    socket.on("new message",(newMessageRecieved)=>
    {
        var chat=newMessageRecieved.chat;

        if(!chat.users)
        {
            return console.log('chat.users not defined');
        }

        chat.users.forEach(user=>
            {
                if(user._id===newMessageRecieved.sender._id)
                {
                    return ;
                }
                socket.in(user._id).emit("message recieved",newMessageRecieved);
            });
    })
})