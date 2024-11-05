import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1/Social-Media");
      
        console.log('mongodb connected successfully.');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;