const Message=require('../models/message');
const Chat=require('../models/chat');
const User=require('../models/user');
const asyncHandler=require('express-async-handler');

exports.sendMessage=asyncHandler(async (req,res)=>
{
    const { content, chatId }=req.body;

    if(!content || !chatId)
    {
        console.log("Invalid data passed to request");
        return res.sendStatus(400);
    }

    var newMessage={
        sender: req.user._id,
        content: content,
        chat: chatId
    };

    try
    {
        var message=await Message.create(newMessage);
        message=await message.populate("sender","name imageURL");
        message=await message.populate("chat");

        message=await User.populate(message,
        {
            path: "chat.users",
            select: "name email imageURL"
        });

        await Chat.findByIdAndUpdate(req.body.chatId,
        {
            latestMessage: message
        });

        res.json(message);
    }
    catch(err)
    {
        res.status(400);
        throw new Error(err.message);
    }
})

exports.allMessages=asyncHandler(async (req,res)=>
{
    try
    {
        const message=await Message.find({ chat: req.params.chatId })
        .populate("sender","name email imageURL")
        .populate("chat");

        res.json(message);
    }
    catch(err)
    {
        res.status(400);
        throw new Error(err.message);
    }
})