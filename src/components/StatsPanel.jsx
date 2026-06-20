const StatsPanel = ({ totalCount, activeCount, completedCount, completionPercentage }) => {
  return (
    <div className='stats-panel'>
      <div className='stats-row'>
        <div className='stat-card'>
          <span className='stat-num'>{totalCount}</span>
          <span className='stat-label'>Total Tasks</span>
        </div>
        <div className='stat-card'>
          <span className='stat-num text-active'>{activeCount}</span>
          <span className='stat-label'>Pending</span>
        </div>
        <div className='stat-card'>
          <span className='stat-num text-success'>{completedCount}</span>
          <span className='stat-label'>Completed</span>
        </div>
      </div>

      <div className='progress-wrapper'>
        <div className='progress-header'>
          <span>Completion Rate</span>
          <span className='progress-percent'>{completionPercentage}%</span>
        </div>
        <div className='progress-bar-bg'>
          <div
            className='progress-bar-fill'
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default StatsPanel
