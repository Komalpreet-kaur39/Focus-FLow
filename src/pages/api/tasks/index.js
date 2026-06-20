import dbConnect from "../../../lib/mongodb";
import Task from "../../../models/task";
export default async function handler(req,res){
    await dbConnect()
    if (req.method==="GET"){
        const tasks=await Task.find()
        return res.status(200).json(tasks)
    }
    if (req.method==="POST"){
        const task=await Task.create(req.body)
        return res.status(201).json(task)
    }
    return res.status(405).json({
        message:"Method not allowed"
    })
}
