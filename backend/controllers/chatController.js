const Chat=require('../models/chat');
const User=require('../models/user');
const asyncHandler=require('express-async-handler');
const user = require('../models/user');

exports.accessChat=asyncHandler(async (req,res)=>
{
    const { userId }=req.body;

    if(!userId)
    {
        console.log("userId param not sent with request");
        return res.sendStatus(400);
    }

    let isChat=await Chat.find(
        {
            isGroupChat: false,
            $and: 
            [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }
    )
    .populate("users","-password")
    .populate("latestMessage");

    isChat=await User.populate(isChat,
        {
            path: 'latestMessage.sender',
            select: "name email imageURL"
        });

    if(isChat.length>0) //chat exists b/w current and other user so return it
    {
        res.send(isChat[0]);
    }
    else
    {
        let chatData=
        {
            chatName: "sender",
            isGroupChat: false,
            users:
            [
                req.user._id,
                userId
            ]
        };

        try
        {
            const createdChat=await Chat.create(chatData);

            const fullChat=await Chat.findOne({ _id: createdChat._id }).populate("users","-password");

            res.status(200).send(fullChat);
        }
        catch(err)
        {
            res.status(400);
            throw new Error(err.message);
        }
    }
});

exports.fetchChats=asyncHandler(async (req,res)=>
{
    try
    {
        Chat.find(
            {
                users: { $elemMatch: { $eq: req.user._id } }
            }
        ).
        populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({ updatedAt:-1 })
        .then(async (result)=>
        {
            result=await User.populate(result,
                {
                    path: 'latestMessage.sender',
                    select: "name email imageURL"
                });

                res.status(200).send(result);
        })
    }
    catch(err)
    {
        res.status(400);
        throw new Error(err.message);
    }
});

exports.createGroupChat=asyncHandler(async (req,res)=>
{
    if(!req.body.users || !req.body.name)
    {
        return res.status(400).send({ message: "Please enter all info!" } );
    }

    let users=JSON.parse(req.body.users); //stringify() from frontend parse into object

    users.push(req.user);

    if(users.length<2)
    {
        return res.status(400).send({ message: "More than 2 users needed to create a group..."});
    }

    try
    {
        const groupChat=await Chat.create(
            {
                chatName: req.body.name,
                users: users,
                isGroupChat: true,
                groupAdmin: req.user
            }
        );

        const fullGroupChat=await Chat.find({ _id: groupChat._id })
        .populate("users","-password")
        .populate("groupAdmin","-password");

        res.status(200).send(fullGroupChat);
    }
    catch(err)
    {
        res.status(400);
        throw new Error(err.message);
    }
});

exports.renameGroup=asyncHandler(async (req,res)=>
{
    const { chatId, chatName } =req.body;

    const updatedChat=await Chat.findByIdAndUpdate(chatId,
        {
            chatName: chatName
        },
        { new: true })
        .populate("users","-password")
        .populate("groupAdmin","password");

    if(!updatedChat)
    {
        res.status(400);
        throw new Error("Chat not found!");
    }
    else
    {
        res.json(updatedChat);
    }
});

exports.addToGroup=asyncHandler(async (req,res)=>
{
    const { chatId, userId }=req.body;

    const added=await Chat.findByIdAndUpdate(chatId,
        {
            $push: { users: userId }
        },
        { new: true})
        .populate("users","-password")
        .populate("groupAdmin","-password");

    if(!added)
    {
        res.status(400);
        throw new Error("Chat not found!");
    }
    else
    {
        res.json(added);
    }
});

exports.removeFromGroup=asyncHandler(async (req,res)=>
{
    const { chatId, userId }=req.body;

    const removed=await Chat.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId }
        },
        { new: true })
        .populate("users","-password")
        .populate("groupAdmin","-password");

    if(!removed)
    {
        res.status(400);
        throw new Error("Chat not found!");
    }
    else
    {
        res.json(removed);
    }
});