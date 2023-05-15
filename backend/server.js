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

app.listen(PORT,console.log(`Server listening on PORT ${PORT}`.blue.bold));