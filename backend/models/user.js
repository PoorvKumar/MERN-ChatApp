const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const bcrypt=require('bcryptjs');

const User=new Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            unique: true,
            required: true
        },
        password:
        {
            type: String,
            requried: true
        },
        imageURL:
        {
            type: String,
            default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },
    { timestamps: true }
);

// User.methods.comparePass=async (password)=>
// {
//     return await bcrypt.compare(password,this.password);
// }

// User.pre("save",async (next)=>
// {
//     if(!this.isModified)
//     {
//         next();
//     }

//     const salt=await bcrypt.genSalt(14);
//     this.password= await bcrypt.hash(this.password,salt);
// })

module.exports=mongoose.model("User",User);