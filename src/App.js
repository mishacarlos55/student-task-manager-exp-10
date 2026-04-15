import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Plus,
  Search,
  Trash2,
  BookOpen,
  CalendarDays,
  Filter,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import "./App.css";

const initialTasks = [
  {
    id: 1,
    title: "Complete DBMS assignment",
    subject: "DBMS",
    dueDate: "2026-04-18",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Prepare CN notes for viva",
    subject: "Computer Networks",
    dueDate: "2026-04-16",
    priority: "Medium",
    completed: true,
  },
];

export default function App() {
  const [studentName, setStudentName] = useState(
    () => localStorage.getItem("studentName") || "Student"
  );

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("studentTasks");
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("studentName", studentName);
  }, [studentName]);

  const addTask = () => {
    if (!title.trim() || !subject.trim() || !dueDate) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      priority,
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setTitle("");
    setSubject("");
    setDueDate("");
    setPriority("Medium");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.subject.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All"
          ? true
          : filter === "Completed"
          ? task.completed
          : !task.completed;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  }, [tasks]);

  const priorityClass = (priority) => {
    if (priority === "High") return "priority high";
    if (priority === "Medium") return "priority medium";
    return "priority low";
  };

  return (
    <div className="app-shell">
      <div className="bg-glow glow-1"></div>
      <div className="bg-glow glow-2"></div>

      <div className="container">
        <header className="hero-card">
          <div className="hero-left">
            <div className="hero-badge">
              <Sparkles size={16} />
              Enchanted Study Planner
            </div>

            <h1>Student Task Manager</h1>
            <p className="hero-text">
              A dark library themed planner for organizing assignments, tracking
              deadlines, and keeping your academic magic in order.
            </p>

            <div className="name-box">
              <label>Scholar Name</label>
              <div className="input-icon">
                <GraduationCap size={18} />
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>Total Scrolls</span>
              <h2>{stats.total}</h2>
            </div>
            <div className="stat-card">
              <span>Completed Spells</span>
              <h2>{stats.completed}</h2>
            </div>
            <div className="stat-card">
              <span>Pending Quests</span>
              <h2>{stats.pending}</h2>
            </div>
          </div>
        </header>

        <main className="main-grid">
          <section className="panel add-task-panel">
            <div className="panel-title">
              <BookOpen size={20} />
              <h3>Add New Task</h3>
            </div>

            <div className="form-grid">
              <div className="field">
                <label>Task Title</label>
                <input
                  type="text"
                  placeholder="Finish OS assignment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="DBMS / CN / React"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="field">
                <label>Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            <button className="add-btn" onClick={addTask}>
              <Plus size={18} />
              Add Task
            </button>
          </section>

          <section className="panel tasks-panel">
            <div className="tasks-top">
              <div>
                <div className="panel-title">
                  <Sparkles size={20} />
                  <h3>{studentName}'s Task Archive</h3>
                </div>
                <p className="subtext">
                  Search through your academic shelf and manage each task.
                </p>
              </div>
            </div>

            <div className="toolbar">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by task or subject"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="filter-box">
                <Filter size={18} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </div>
            </div>

            <div className="task-list">
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <div
                    className={`task-card ${task.completed ? "completed-card" : ""}`}
                    key={task.id}
                  >
                    <button
                      className="status-btn"
                      onClick={() => toggleTask(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={22} />
                      ) : (
                        <Circle size={22} />
                      )}
                    </button>

                    <div className="task-content">
                      <div className="task-top-row">
                        <h4 className={task.completed ? "completed-text" : ""}>
                          {task.title}
                        </h4>
                        <span className={priorityClass(task.priority)}>
                          {task.priority}
                        </span>
                      </div>

                      <div className="task-meta">
                        <span>
                          <BookOpen size={15} />
                          {task.subject}
                        </span>
                        <span>
                          <CalendarDays size={15} />
                          {task.dueDate}
                        </span>
                      </div>
                    </div>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <BookOpen size={34} />
                  <p>No tasks found in this shelf.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}