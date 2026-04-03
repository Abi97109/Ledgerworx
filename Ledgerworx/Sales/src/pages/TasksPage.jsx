import { useMemo, useState } from "react";
import SalesLayout from "../components/SalesLayout";
import { tasksData } from "../data/mockData";

export default function TasksPage() {
  const [tasks, setTasks] = useState(tasksData);
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", lead: "", dueDate: "", priority: "medium", description: "" });

  const today = new Date().toISOString().split("T")[0];

  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      const isOverdue = task.dueDate < today;
      const isToday = task.dueDate === today;
      const isUpcoming = task.dueDate > today;

      const byTab =
        filter === "all" ? true : filter === "overdue" ? isOverdue : filter === "today" ? isToday : isUpcoming;
      const byPriority = !priority || task.priority === priority;
      const bySearch = task.title.toLowerCase().includes(search.toLowerCase()) || task.lead.toLowerCase().includes(search.toLowerCase());

      return byTab && byPriority && bySearch;
    });
  }, [tasks, filter, priority, search, today]);

  const addTask = (event) => {
    event.preventDefault();
    if (!form.title || !form.lead || !form.dueDate) {
      return;
    }

    setTasks((prev) => [
      {
        id: Date.now(),
        title: form.title,
        lead: form.lead,
        dueDate: form.dueDate,
        priority: form.priority
      },
      ...prev
    ]);

    setForm({ title: "", lead: "", dueDate: "", priority: "medium", description: "" });
    setShowModal(false);
  };

  return (
    <SalesLayout pageClass="sales-page--tasks">
      <div className="container">
        <div className="lw-page-header">
          <h1>Tasks</h1>
        </div>

        <div className="filters-section">
          <div className="filter-tabs">
            <span className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All Tasks</span>
            <span className={filter === "overdue" ? "active" : ""} onClick={() => setFilter("overdue")}>Overdue</span>
            <span className={filter === "today" ? "active" : ""} onClick={() => setFilter("today")}>Today</span>
            <span className={filter === "upcoming" ? "active" : ""} onClick={() => setFilter("upcoming")}>Upcoming</span>
          </div>

          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select value={priority} onChange={(event) => setPriority(event.target.value)}>
              <option value="">All Priorities</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <button className="lw-btn" onClick={() => setShowModal(true)}>
              + Add Task
            </button>
          </div>
        </div>

        <div className="table-card">
          <table className="tasks-table">
            <thead>
              <tr>
                <th></th>
                <th>Task</th>
                <th>Related Lead</th>
                <th>Due Date</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {visibleTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td>
                    <strong className="task-title">{task.title}</strong>
                  </td>
                  <td className="task-lead">{task.lead}</td>
                  <td className={task.dueDate < today ? "task-due task-due--overdue" : "task-due"}>{task.dueDate}</td>
                  <td>
                    <span className={`lw-badge ${task.priority}`}>{task.priority}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <span>{visibleTasks.length} tasks</span>
            <span>&lsaquo; &rsaquo;</span>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="lw-modal-content leads-modal-content">
            <div className="leads-modal-shell">
              <div className="leads-modal-header">
                <div>
                  <h2>Add New Task</h2>
                  <p>Create a task in a simple top-to-bottom flow so it stays easy to scan and fill.</p>
                </div>
              </div>
              <form onSubmit={addTask} className="sales-form-stack">
                <div className="form-group sales-form-field">
                  <label htmlFor="taskTitle">Task Title</label>
                  <input
                    id="taskTitle"
                    type="text"
                    required
                    value={form.title}
                    onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                  />
                </div>
                <div className="form-group sales-form-field">
                  <label htmlFor="taskLead">Lead Name</label>
                  <input
                    id="taskLead"
                    type="text"
                    required
                    value={form.lead}
                    onChange={(event) => setForm((prev) => ({ ...prev, lead: event.target.value }))}
                  />
                </div>
                <div className="form-group sales-form-field">
                  <label htmlFor="taskDueDate">Due Date</label>
                  <input
                    id="taskDueDate"
                    type="date"
                    required
                    value={form.dueDate}
                    onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))}
                  />
                </div>
                <div className="form-group sales-form-field">
                  <label htmlFor="taskPriority">Priority</label>
                  <select
                    id="taskPriority"
                    value={form.priority}
                    onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}
                  >
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div className="form-group sales-form-field">
                  <label htmlFor="taskDescription">Description</label>
                  <textarea
                    id="taskDescription"
                    rows="4"
                    value={form.description}
                    onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                  ></textarea>
                </div>
                <div className="leads-modal-footer">
                  <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </SalesLayout>
  );
}
