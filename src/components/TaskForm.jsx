import { useState } from 'react'

const TaskForm = ({ editItem, onSubmit, onCancel }) => {
  const [task, setTask] = useState(editItem ? editItem.title : "")
  const [detail, setDetail] = useState(editItem ? editItem.detail : "")
  const [priority, setPriority] = useState(editItem ? (editItem.priority || "medium") : "medium")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) return
    onSubmit({ title: task.trim(), detail: detail.trim(), priority })
    setTask("")
    setDetail("")
  }

  return (
    <form onSubmit={handleSubmit} className='task-form'>
      <input
        type='text'
        placeholder='What needs to be done?'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        required
      />
      <textarea
        placeholder='Add additional details (optional)...'
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
        rows={4}
      />
      
      <div className='priority-selector-container'>
        <span className='priority-label'>Priority Level</span>
        <div className='priority-options'>
          {['low', 'medium', 'high'].map((level) => (
            <button
              key={level}
              type='button'
              className={`priority-select-btn ${level} ${priority === level ? 'active' : ''}`}
              onClick={() => setPriority(level)}
            >
              <span className='priority-dot' />
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className='form-actions'>
        <button type='submit'>{editItem ? 'Update Task' : 'Create Task'}</button>
        {onCancel && (
          <button type='button' className='cancel' onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default TaskForm
