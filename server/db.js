import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const url=process.env.MONGO
const connectToMongo=()=>{
   mongoose.connect(url,()=>{
    console.log("Connect to db");
   }) 
}

export default connectToMongo