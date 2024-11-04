import mongoose from "mongoose"


const ContactS= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true,
    }
})

export const Contact = mongoose.model("Contact",ContactS);
