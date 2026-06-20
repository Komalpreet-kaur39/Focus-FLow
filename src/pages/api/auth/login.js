import dbConnect from "../../../lib/mongodb"
import User from "../../../models/users"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default async function handler(req,res){
    if (req.method!="POST") return res.status(405).end()
    await dbConnect()

    const{email,password}=req.body

    const user=await User.findOne({email})

    if(!user){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credentials"
        })
    }
    const token=jwt.sign(
        {id:user._id,email:user.email},
        process.env.JWT_SECRET,
        {expiresIn:"7d"})

    res.status(200).json({
        message:"Login Successful",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email,
        }
    })
}   