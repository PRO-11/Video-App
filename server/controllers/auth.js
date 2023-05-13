import { createError } from "../error.js"
import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export  const signup=async(req,res,next)=>{

    try{
        const salt=bcrypt.genSaltSync(10)
        const hash=bcrypt.hashSync(req.body.password,salt)
        const newUser=new User({...req.body,password:hash})

        await newUser.save()
        res.status(200).json({msg:"User has been created" })
    }
    catch(err){
        next(err)
    }

}


export  const signin=async(req,res,next)=>{

    try{
       const user=await User.findOne({name:req.body.name})
       if(!user) return next(createError(404,"User Not Found!"))

       const isCorrect=await bcrypt.compare(req.body.password,user.password)

       if(!isCorrect) return next(createError(400,"Wrong Credentials!"))

       const token=jwt.sign({id:user._id},process.env.JWT)
       const cookieValue = token;
       const {password,...others}=user._doc;
const cookieOptions = {
    httpOnly: true, // Prevent client-side JavaScript access
    secure: true, // Only send the cookie over HTTPS (requires SSL)
    maxAge: 3600, // Cookie expiration time in seconds (1 hour in this example)
    sameSite: 'strict', // Restrict cookie to same-site requests
    path: '/', // Set the cookie path to root ("/") or any other path you need
    domain: 'https://pro-player-seven.vercel.app' // Set the cookie domain
  };

  // Set the cookie header in the response
  res.setHeader('Set-Cookie', `access_token=${cookieValue}; ${Object.entries(cookieOptions).map(([key, value]) => `${key}=${value}`).join('; ')}`);
    //    res.cookie("access_token",token ,{ httpOnly: true, domain:'https://pro-player-seven.vercel.app',sameSite: 'strict',path: '/', // Restrict cookie to same-site requests
    //    path: '/', })
       res.status(200)
       .json(others)

    }
    catch(err){
        next(err)
    }

}


export const googleAuth=async(req,res,next)=>{
console.log(req.body)
    try{
        const user=await User.findOne({email:req.body.email})
        if(user)
        {
            const token=jwt.sign({id:user._id},process.env.JWT)
            const {password,...others}=user._doc;
     
            res.cookie("access_token",token,{
             httpOnly:true
            })
            .status(200)
            .json(others)
        }
        else{
            const newUser=new User({...req.body,fromGoogle:true})

        const savedUser=await newUser.save()
        const token=jwt.sign({id:savedUser._id},process.env.JWT)
            const {password,...others}=savedUser._doc;
     
            res.cookie("access_token",token,{
             httpOnly:true
            })
            .status(200)
            .json(others)
        }
    }catch(err)
    {
        next(err);
    }

}