import mongoose from "mongoose";
const TaskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    detail:{
        type:String,
        default:"",
    },
    completed:{
        type:Boolean,
        default:false,
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"medium",
    },
    },
   {
    timestamps:true,
    }    
);
if (mongoose.models.Task) {
  delete mongoose.models.Task;
}
export default mongoose.model("Task",TaskSchema)
