"use client";

import { useMemo, useState } from "react";

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

export default function useTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const remainingCount = tasks.length - completedCount;

  function addTask({ title, category, priority }) {
    if (!title.trim()) return false;

    const task = {
      id: Date.now(),
      title: title.trim(),
      category,
      priority,
      completed: false,
    };

    setTasks((currentTasks) => [task, ...currentTasks]);

    return true;
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.trim().toLowerCase());

      const matchesFilter =
        filter === "All" ||
        (filter === "Completed" && task.completed) ||
        (filter === "Pending" && !task.completed);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchQuery, filter]);

  return {
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
  };
}
