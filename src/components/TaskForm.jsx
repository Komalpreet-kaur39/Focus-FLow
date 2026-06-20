import { useState } from 'react'

const TaskForm = ({ editItem, onSubmit, onCancel }) => {
  const [task, setTask] = useState(editItem ? editItem.title : "")
  const [detail, setDetail] = useState(editItem ? editItem.detail : "")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task.trim()) return
    onSubmit({ title: task.trim(), detail: detail.trim() })
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
