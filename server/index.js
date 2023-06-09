import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import videoRoutes from "./routes/video.js"
import commentRoutes from "./routes/comment.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import connectToMongo from "./db.js"
import { fileURLToPath } from 'url';

dotenv.config()
const app=express()
connectToMongo()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const connect=()=>{
//   mongoose.connect(process.env.MONGO).then(()=>{
//     console.log("Connected to db")
//   }).catch((err)=>{
//     throw err
//   })
// }
app.use(cors());
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRoutes) 
app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)


//error handling middleware
app.use((err,req,res,next)=>{
    const status=err.status || 500
    const message=err.message || "Something went wrong!"

    return res.status(status).json({
        success:false,
        status,
        message
    })
})



// app.get('/', (req, res) => {
//   res.send('Hey this is my API running 🥳')
// })


// if(process.env.NODE_ENV=='production'){
  
//   console.log("Serve file")
//   app.get('/',(req,res)=>{
//       app.use(express.static(path.resolve(__dirname,'build')))
//       res.sendFile(path.resolve(__dirname,'build','index.html'))
//   })
// }

const PORT=process.env.PORT||8081
app.listen(PORT,()=>{
 
    console.log("Server is running on port 8081")
})