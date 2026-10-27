"use client";

import { useMemo, useState } from "react";
import "./page.css";

const initialTasks = [
  {
    id: 1,
    title: "Complete project documentation",
    category: "Work",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Revise React interview concepts",
    category: "Study",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Plan weekly goals",
    category: "Personal",
    priority: "Low",
    completed: true,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [newPriority, setNewPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [error, setError] = useState("");

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingCount = tasks.length - completedCount;

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);

      const matchesNav =
        activeNav !== "Upcoming" || !task.completed;

      return matchesSearch && matchesFilter && matchesNav;
    });
  }, [tasks, searchQuery, filter, activeNav]);

  function addTask(event) {
    event.preventDefault();

    const title = newTask.trim();

    if (!title) {
      setError("Please enter a task title.");
      return;
    }

    const task = {
      id: Date.now(),
      title,
      category: newCategory,
      priority: newPriority,
      completed: false,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);
    setNewTask("");
    setError("");
    setFilter("All");
    setActiveNav("Dashboard");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const navigation = [
    { label: "Dashboard", icon: "⌂" },
    { label: "My Tasks", icon: "✓" },
    { label: "Upcoming", icon: "◷" },
  ];

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <a
          className="logo"
          href="#home"
          onClick={() => setActiveNav("Dashboard")}
        >
          <span className="logo-mark">T</span>
          TaskFlow
        </a>

        <p className="sidebar-caption">WORKSPACE</p>

        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`nav-link ${
                activeNav === item.label ? "active" : ""
              }`}
              onClick={() => {
                setActiveNav(item.label);
                setFilter("All");
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="profile-avatar">TF</div>
          <div>
            <p className="profile-name">My Workspace</p>
            <p className="profile-caption">Personal planner</p>
          </div>
        </div>
      </aside>

      <section className="main-content" id="home">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h1 className="page-title">
              {activeNav === "Dashboard"
                ? "My Dashboard"
                : activeNav}
            </h1>
            <p className="page-subtitle">
              Make progress, one task at a time.
            </p>
          </div>

          <div className="today-badge">
            <span className="status-dot" />
            Stay productive
          </div>
        </header>

        <section className="summary-grid" aria-label="Task summary">
          <SummaryCard
            label="Total tasks"
            value={tasks.length}
            icon="▤"
            tone="purple"
          />
          <SummaryCard
            label="Completed"
            value={completedCount}
            icon="✓"
            tone="green"
          />
          <SummaryCard
            label="Remaining"
            value={remainingCount}
            icon="◷"
            tone="orange"
          />
        </section>

        <section className="task-panel" id="tasks">
          <div className="section-heading">
            <div>
              <h2 className="section-title">My Tasks</h2>
              <p className="section-subtitle">
                Organize your day and track your progress.
              </p>
            </div>

            <span className="task-count">
              {filteredTasks.length} shown
            </span>
          </div>

          <form className="task-form" onSubmit={addTask}>
            <div className="input-wrap">
              <label className="field-label" htmlFor="task-title">
                Task title
              </label>
              <input
                id="task-title"
                className="task-input"
                value={newTask}
                onChange={(event) => {
                  setNewTask(event.target.value);
                  setError("");
                }}
                placeholder="What do you need to do?"
              />
            </div>

            <div className="input-wrap">
              <label className="field-label" htmlFor="task-category">
                Category
              </label>
              <select
                id="task-category"
                className="task-select"
                value={newCategory}
                onChange={(event) =>
                  setNewCategory(event.target.value)
                }
              >
                <option>Personal</option>
                <option>Work</option>
                <option>Study</option>
              </select>
            </div>

            <div className="input-wrap">
              <label className="field-label" htmlFor="task-priority">
                Priority
              </label>
              <select
                id="task-priority"
                className="task-select"
                value={newPriority}
                onChange={(event) =>
                  setNewPriority(event.target.value)
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <button className="add-button" type="submit">
              <span>+</span> Add Task
            </button>
          </form>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <div className="task-toolbar">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input
                className="search-input"
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(event.target.value)
                }
                placeholder="Search tasks..."
                aria-label="Search tasks"
              />
            </div>

            <div className="filter-group" aria-label="Filter tasks">
              {["All", "Pending", "Completed"].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`filter-button ${
                    filter === option ? "selected" : ""
                  }`}
                  onClick={() => setFilter(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="task-list">
            {filteredTasks.map((task) => (
              <article className="task-row" key={task.id}>
                <input
                  className="task-checkbox"
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  aria-label={`Mark ${task.title} as ${
                    task.completed ? "pending" : "completed"
                  }`}
                />

                <div className="task-details">
                  <p
                    className={`task-name ${
                      task.completed ? "is-completed" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="task-meta">
                    <span className="category-label">
                      {task.category}
                    </span>
                    <span className="meta-separator">·</span>
                    <span
                      className={`priority-label priority-${task.priority.toLowerCase()}`}
                    >
                      {task.priority} priority
                    </span>
                  </div>
                </div>

                <span
                  className={`task-status ${
                    task.completed ? "status-completed" : "status-pending"
                  }`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <button
                  type="button"
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                  title="Delete task"
                >
                  ×
                </button>
              </article>
            ))}

            {filteredTasks.length === 0 && (
              <div className="empty-state">
                <span className="empty-icon">✓</span>
                <h3>No tasks found</h3>
                <p>Try a different search or add a new task.</p>
              </div>
            )}
          </div>

          <footer className="task-footer">
            <span>
              {completedCount} of {tasks.length} tasks completed
            </span>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    tasks.length
                      ? (completedCount / tasks.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </footer>
        </section>

        <p className="footer-note">
          Built with Next.js, React and Tailwind CSS.
        </p>
      </section>
    </main>
  );
}

function SummaryCard({ label, value, icon, tone }) {
  return (
    <article className="summary-card">
      <div className={`summary-icon ${tone}`}>{icon}</div>
      <p className="summary-label">{label}</p>
      <p className="summary-value">{value}</p>
    </article>
  );
}
