const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const message=new Schema(
    {
        sender:
        {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content:
        {
            type: String,
            trim: true //to remove uneccessary whitespaces in begining, middle and end 
        },
        chat:
        {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            requried: true
        }
    },
    { timestamps: true }
);

module.exports=mongoose.model("Message",message);

//sender
//reciever
//content
//chat //which chat it belongs to