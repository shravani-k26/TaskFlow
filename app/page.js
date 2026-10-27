"use client";

import { useState } from "react";
import "./page.css";
import useTasks from "../hooks/useTasks";
import SummaryCard from "../components/SummaryCard";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const {
    tasks,
    completedCount,
    remainingCount,
    addTask,
    toggleTask,
    deleteTask,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    filteredTasks,
  } = useTasks();

  const [newTask, setNewTask] = useState("");
  const [newCategory, setNewCategory] = useState("Personal");
  const [newPriority, setNewPriority] = useState("Medium");
  const [error, setError] = useState("");

  function handleAddTask(event) {
    event.preventDefault();

    const success = addTask({
      title: newTask,
      category: newCategory,
      priority: newPriority,
    });

    if (!success) {
      setError("Please enter a task title.");
      return;
    }

    setNewTask("");
    setError("");
    setFilter("All");
  }

  return (
    <main className="dashboard">
      <Sidebar />
      <section className="main-content">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR WORKSPACE</p>
            <h2 className="page-title">My Dashboard</h2>
            <p className="page-subtitle">
              Make progress, one task at a time.
            </p>
          </div>
        </header>

        <section className="summary-grid">
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

        <section className="task-panel">
          <div className="section-heading">
            <div>
              <h3 className="section-title">My Tasks</h3>
              <p className="section-subtitle">
                Organize your day and track your progress.
              </p>
            </div>
            <span className="task-count">
              {filteredTasks.length} shown
            </span>
          </div>

          <form className="task-form" onSubmit={handleAddTask}>
            <div className="input-wrap">
              <label className="field-label" htmlFor="task-title">
                Task title
              </label>
              <input
                id="task-title"
                className="task-input"
                value={newTask}
                onChange={(event) => setNewTask(event.target.value)}
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
                onChange={(event) => setNewCategory(event.target.value)}
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
                onChange={(event) => setNewPriority(event.target.value)}
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

          {error && <p className="form-error">{error}</p>}

          <div className="task-toolbar">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input
                className="search-input"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search tasks..."
                aria-label="Search tasks"
              />
            </div>

            <div className="filter-group">
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
                  aria-label={`Complete ${task.title}`}
                />

                <div className="task-details">
                  <p className={`task-name ${
                    task.completed ? "is-completed" : ""
                  }`}>
                    {task.title}
                  </p>

                  <div className="task-meta">
                    <span className="category-label">
                      {task.category}
                    </span>
                    <span className="meta-separator">·</span>
                    <span className={`priority-label priority-${task.priority.toLowerCase()}`}>
                      {task.priority} priority
                    </span>
                  </div>
                </div>

                <span className={`task-status ${
                  task.completed ? "status-completed" : "status-pending"
                }`}>
                  {task.completed ? "Completed" : "Pending"}
                </span>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  ×
                </button>
              </article>
            ))}

            {filteredTasks.length === 0 && (
              <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Try another search or add a new task.</p>
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
