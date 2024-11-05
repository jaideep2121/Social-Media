import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/CLONE");
      
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;