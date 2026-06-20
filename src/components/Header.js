import { useRouter } from "next/router";
import { useTasks } from "../context/TaskContext";

export default function Header() {
  const router = useRouter();
  const { setEditIndex } = useTasks();

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="header-workspace-name">FocusFlow</h1>
        <span className="header-owner-badge">
          Business Tasks Manager
        </span>
      </div>

      <nav className="header-nav">
        <button
          className={`nav-link ${
            router.pathname === "/task" ? "active" : ""
          }`}
          onClick={() => {
            setEditIndex(-1);
            router.push("/task");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6" />
            <line x1="8" y1="12" x2="21" y2="12" />
            <line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" />
            <line x1="3" y1="12" x2="3.01" y2="12" />
            <line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
          Tasks
        </button>

        <button
          className={`nav-link ${
            router.pathname === "/stats" ? "active" : ""
          }`}
          onClick={() => {
            setEditIndex(-1);
            router.push("/stats");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          Insights
        </button>

        <button
          className="nav-link logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            router.push("/login");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </nav>
    </header>
  );
}