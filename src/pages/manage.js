import TaskForm from '../components/TaskForm';
import { useRouter } from 'next/router';
import {useTasks} from '../context/TaskContext'; 
import axios from 'axios'
export default function Manage() {
    const {list,setList,editIndex,setEditIndex} = useTasks();
    const router=useRouter();
    const handleSubmit = async (taskData) => {
        if(editIndex>=0){
          const taskId=list[editIndex]._id
          await axios.put(`/api/tasks/${taskId}`,{
            title:taskData.title,
            detail:taskData.detail,
            priority:taskData.priority
          })
          setEditIndex(-1)
          }
        else{
            const newTask ={
            ...taskData,completed:false
            };
            // setList([...list,newTask]);
            await axios.post("/api/tasks",newTask)
        }
        router.push("/task")
        
    }
    const editItem=editIndex>=0?list[editIndex]:null
    const handleCancel = () => {
  setEditIndex(-1);
  router.push("/task");
};
  return (
    <div className="page-container">
    <h1 className="page-title">
      {editItem ? "Edit Task" : "Manage Task"}
    </h1>
      <TaskForm
        editItem={editItem}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}