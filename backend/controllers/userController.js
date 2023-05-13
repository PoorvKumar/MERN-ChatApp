const asyncHandler = require('express-async-handler');
const User=require('../models/user');
const generateToken = require('../config/generateToken');
const bcrypt=require('bcryptjs');

exports.registerUser=asyncHandler(async (req,res)=>
{
    let { name,email,password,imageURL }=req.body;

    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error("Enter all the fields...");
    }

    //to lower case
    email=email.toLowerCase();

    const userExists=await User.findOne({email: email});

    if(userExists)
    {
        res.status(400);
        throw new Error("User already exists...");
    }

    //hash password
    const salt=await bcrypt.genSalt(14);
    password=await bcrypt.hash(password,salt);

    const user=await User.create(
        {
            name: name,
            email: email,
            password: password,
            imageURL: imageURL
        }
    );

    if(user)
    {
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                imageURL: user.imageURL,
                token: generateToken(user._id)
            }
        );
    }
    else
    {
        res.status(400);
        throw new Error("Falied to create user...");
    }
});

exports.authUser=asyncHandler(async (req,res)=>
{
    let { email,password }=req.body;

    //to lower case
    email=email.toLowerCase();

    const user=await User.findOne({email: email});

    let match=false;
    if(user) //compare password when user exists
    {
        match=await bcrypt.compare(password,user.password);
    }
    else
    {
        res.status(400);
        throw new Error("User Not Found...");
    }

    if(user && match)
    {
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                imageURL: user.imageURL,
                token: generateToken(user._id)
            }
        );
    }
    else
    {
        res.status(400);
        throw new Error("Incorrect Password...");
    }
});

// /api/user?search=
exports.getUser=asyncHandler(async (req,res)=>
{
    // const keyword=req.query.search;
    // console.log(keyword);
    
    const keyword=req.query.search?
    {
        $or: [
            { 
                name: { $regex: req.query.search, $options: "i" },
                email: { $regex: req.query.search, $options: "i" }
            }
        ]
    }:
    {}; //condition?statement1:statement2;

    const users=await User.find(keyword).find({_id: { $ne: req.user._id } });
    //all users except the currently logged in user

    res.send(users);
});