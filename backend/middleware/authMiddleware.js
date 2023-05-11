const jwt=require('jsonwebtoken');
const User=require('../models/user');
const asyncHandler=require('express-async-handler');

exports.protect=asyncHandler(async (req,res,next)=>
{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try
        {
            //token -> "Bearer hdasjkl43fsd23klasfh643-3klashj"
            token=req.headers.authorization.split(" ")[1];

            //decode token id
            const decoded=jwt.verify(token,process.env.JWT_SECRET);

            req.user=await User.findById(decoded.id).select("-password"); 
            //find user by id and return it without password so password not stored in localStorage

            next();
        }
        catch(err)
        {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
});