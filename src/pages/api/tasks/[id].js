import dbConnect from '../../../lib/mongodb';
import Task from '../../../models/task';
export default async function handler(req,res){
    await dbConnect()

    const {id}=req.query

    if (req.method==="PUT"){
        const updatedTask=await Task.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json(updatedTask)
    }

    if (req.method==="DELETE"){
        await Task.findByIdAndDelete(id)
        return res.status(200).json({message:"Task deleted successfully"})
    }
    return res.status(405).json({
        message:"Method not allowed"
    })


}