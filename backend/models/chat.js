const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const chat=new Schema(
    {
        chatName:
        {
            type: String,
            requried: true,
            trim: true
        },
        isGroupChat:
        {
            type: Boolean,
            default: false
        },
        users:
        [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        latestMessage:
        {
            type: Schema.Types.ObjectId,
            ref: "Message"
        },
        groupAdmin:
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps: true }
);

module.exports=mongoose.model("Chat",chat);

//chatName //grouptitle in case of group chat // person name in case of single chat
//isGroupChat
//users
//latestMessage //to display on the div where all chats to see last message
//groupAdmin //in case of group chat