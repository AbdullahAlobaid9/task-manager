import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import API from "../api/axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    search: "",
  });

  const fetchTasks = async () => {
    let query = "";
    if (filters.status) query += `status=${filters.status}&`;
    if (filters.priority) query += `priority=${filters.priority}&`;
    const res = await API.get(`tasks/?${query}`);
    const filtered = res.data.filter(
      (task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase())
    );
    setTasks(filtered);
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase())
  );

  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    display: "grid",
    placeItems: "center",
    backgroundColor: "#f7f9fc",
    padding: "20px",
  };

  const contentStyle = {
    width: "100%",
    maxWidth: "900px",
    display: "grid",
    gap: "30px",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "grid",
    gap: "25px",
  };

  const headerStyle = {
    textAlign: "center",
    color: "#222",
    fontSize: "28px",
    marginBottom: "10px",
  };

  const filterStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    alignItems: "center",
  };

  const selectWrapperStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const selectStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  };

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "15px",
  };

  const searchInputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Top Card: Add Task */}
        <div style={cardStyle}>
          <h2 style={headerStyle}>Add Task</h2>
          <div style={{ display: "grid", gap: "20px" }}>
            <TaskForm onTaskCreated={fetchTasks} useSections={true} />
          </div>
        </div>

        {/* Bottom Card: Search + Filter + Task List */}
        <div style={cardStyle}>
          <input
            type="text"
            name="search"
            placeholder="Search tasks..."
            value={filters.search}
            onChange={handleFilterChange}
            style={searchInputStyle}
          />

          <div style={filterStyle}>
            <div style={selectWrapperStyle}>
              <label htmlFor="status" style={labelStyle}>
                Status
              </label>
              <select
                name="status"
                id="status"
                value={filters.status}
                onChange={handleFilterChange}
                style={selectStyle}
              >
                <option value="">All</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div style={selectWrapperStyle}>
              <label htmlFor="priority" style={labelStyle}>
                Priority
              </label>
              <select
                name="priority"
                id="priority"
                value={filters.priority}
                onChange={handleFilterChange}
                style={selectStyle}
              >
                <option value="">All</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <TaskList
            tasks={tasks}
            onTaskUpdated={fetchTasks}
            selectedStatus={filters.status}
            selectedPriority={filters.priority}
            searchQuery={filters.search}
          />
        </div>
      </div>
    </div>
  );
}
