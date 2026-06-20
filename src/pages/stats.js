import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StatsPanel from "../components/StatsPanel";

const Stats = () => {
  const [stats, setStats] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/tasks/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setStats({
            total: 0,
            completed: 0,
            pending: 0,
            completionPercentage: 0,
            rating: "Error Loading Stats",
            tip: "Could not fetch stats. Please try again later.",
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        setStats({
          total: 0,
          completed: 0,
          pending: 0,
          completionPercentage: 0,
          rating: "Error Loading Stats",
          tip: "Could not fetch stats. Please try again later.",
        });
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  const handleAddTaskClick = () => {
    router.push("/manage");
  };

  return (
    <div className="page-container stats-page">
      <h2 className="page-title">Performance Insights</h2>

      {stats.total > 0 ? (
        <div className="analytics-grid">
          <StatsPanel
            totalCount={stats.total}
            activeCount={stats.pending}
            completedCount={stats.completed}
            completionPercentage={stats.completionPercentage}
          />

          <div className="analytics-card main-stats-card">
            <span className="analytics-card-label">Productivity Grade</span>
            <h3 className="analytics-grade">{stats.rating}</h3>
            <p className="analytics-card-desc">{stats.tip}</p>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="empty-icon"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <p className="empty-title">No stats recorded yet</p>
          <p className="empty-subtitle">
            Add a task first to start tracking your business goals and insights!
          </p>
          <button
            type="button"
            className="add-new-task-btn"
            onClick={handleAddTaskClick}
            style={{ marginTop: "16px", alignSelf: "center" }}
          >
            Create Your First Task
          </button>
        </div>
      )}
    </div>
  );
};

export default Stats;