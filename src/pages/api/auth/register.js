import dbConnect from "../../../lib/mongodb"
import User from "../../../models/users"
import bcrypt from "bcryptjs"

export default async function handler(req,res){

    if(req.method!=="POST")return res.status(405).end()
    await dbConnect()
    const {name,email,password}=req.body
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"User LAready Exists"
        })
    }
    const hashedPassword=await bcrypt.hash(password,10)
    const user=await User.create({
        name,
        email,
        password:hashedPassword
    })
    res.status(201).json({
        message: "User created successfully",
        user:{id:user._id,name:user.name,email:user.email}
    })


}