import { Contact } from "../models/contactme.model.js";


export const Conatct=async(req,res)=>{
 try{
    const{name,email,subject,message}= req.body;

    const ress=Contact.create({name,email,subject,message});

    res.status(200).json({
        message:"Sucessfully Send",
        ress,
        success:true,
    })

 }catch(error){
console.log(error);
res.status(500);
 }

}