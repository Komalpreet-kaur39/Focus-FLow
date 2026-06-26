import TaskItem from "../components/TaskItem";
import {useState} from 'react'
import {useRouter} from 'next/router'
import {useTasks} from '../context/TaskContext';
import axios from 'axios'
import {useEffect} from 'react'
export default function Tasks() {
    const {list,setList,setEditIndex}=useTasks();
    const [filter, setFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    const processedTasks = list
      .filter((item) => {
        if (filter === "active") return !item.completed;
        if (filter === "completed") return item.completed;
        return true;
      })
      .filter((item) => {
        if (priorityFilter === "all") return true;
        return (item.priority || "medium") === priorityFilter;
      })
      .sort((a, b) => {
        if (sortBy === "priority") {
          const weight = { high: 3, medium: 2, low: 1 };
          const weightA = weight[a.priority || "medium"];
          const weightB = weight[b.priority || "medium"];
          if (weightB !== weightA) return weightB - weightA;
          // Sub-sort by date if priorities are equal
          return new Date(b.createdAt) - new Date(a.createdAt);
        }
        if (sortBy === "oldest") {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

    const router=useRouter();

    useEffect(()=>{
      fetchTasks()
    },[])
    const fetchTasks=async()=>{
      const response=await axios.get("/api/tasks")
      setList(response.data)
    }

    const onAddTaskClick = () => {
        router.push("/manage")
    }

    const onEditTask = (index) => {
      setEditIndex(index)
      router.push("/manage")
    }
  
    const onDeleteTask = async(id) => {
      await axios.delete(`/api/tasks/${id}`)
      const response =await  axios.get("/api/tasks")
      setList(response.data)
    }

    const onToggleComplete = async(index) => {
      const task=list[index]
      await axios.put(`/api/tasks/${task._id}`,{
        title:task.title,
        detail:task.detail,
        priority:task.priority || "medium",
        completed:!task.completed
      })
      const response = await axios.get("/api/tasks")
      setList(response.data)
      }

  return (
    <>
     <div className='page-container task-list-page'>
      <div className='page-header-row'>
        <div className='page-header-title-group'>
          <h2 className='page-title'>My Tasks</h2>
          <span className='task-badge'>{list.length}</span>
        </div>
        <button
          type='button'
          className='add-new-task-btn'
          onClick={onAddTaskClick}
        >
          + Add Task
        </button>
      </div>

      {list.length > 0 ? (
        <>
          <div className='filter-bar'>
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({list.length})
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Pending ({list.filter(item => !item.completed).length})
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({list.filter(item => item.completed).length})
            </button>
          </div>

          <div className='dashboard-controls'>
            <div className='control-group'>
              <span className='control-label'>Priority:</span>
              <select
                className='control-select'
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
              >
                <option value='all'>All Priorities</option>
                <option value='high'>High</option>
                <option value='medium'>Medium</option>
                <option value='low'>Low</option>
              </select>
            </div>

            <div className='control-group'>
              <span className='control-label'>Sort:</span>
              <select
                className='control-select'
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value='newest'>Newest First</option>
                <option value='oldest'>Oldest First</option>
                <option value='priority'>Priority (High → Low)</option>
              </select>
            </div>
          </div>

          <div className='task-list'>
            {processedTasks.length > 0 ? (
              processedTasks.map((item) => {
                const originalIndex = list.findIndex((x) => x === item)
                return (
                  <TaskItem
                    key={originalIndex}
                    item={item}
                    onToggleComplete={() => onToggleComplete(originalIndex)}
                    onEdit={() => onEditTask(originalIndex)}
                    onDelete={() => onDeleteTask(item._id)}
                  />
                )
              })
            ) : (
              <div className='empty-state'>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-icon"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                <p className='empty-title'>No matching tasks</p>
                <p className='empty-subtitle'>No tasks match your filters.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className='empty-state'>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="empty-icon"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p className='empty-title'>Your workspace is empty</p>
          <p className='empty-subtitle'>Add a task above to start tracking your business goals!</p>
          <button
            type='button'
            className='save-settings-btn'
            onClick={onAddTaskClick}
            style={{ marginTop: '16px', alignSelf: 'center' }}
          >
            Create Your First Task
          </button>
        </div>
      )}
    </div>
    </>
  );
}