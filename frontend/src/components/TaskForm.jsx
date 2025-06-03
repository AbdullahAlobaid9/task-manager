import { useState } from "react";
import API from "../api/axios";

export const barStyle = (active, color) => ({
  padding: "8px 14px",
  borderRadius: "20px",
  cursor: "pointer",
  backgroundColor: active ? color : "#e0e0e0",
  color: active ? "white" : "#333",
  border: "none",
  fontWeight: "bold",
  transition: "background-color 0.3s",
});

export default function TaskForm({ onTaskCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
    status: "pending",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("tasks/", form);
    setForm({
      title: "",
      description: "",
      priority: "medium",
      status: "pending",
    });
    onTaskCreated();
  };

  const labelStyle = {
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "15px",
  };

  const inputStyle = {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  };

  const buttonStyle = {
    fontSize: "18px",
    padding: "12px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: "10px",
    transition: "background-color 0.3s",
  };

  const barGroupStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  };

  const formStyle = {
    display: "grid",
    gap: "20px",
    maxWidth: "500px",
    margin: "0 auto",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div>
        <label htmlFor="title" style={labelStyle}>
          Title
        </label>
        <input
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
          style={inputStyle}
        />
      </div>

      <div>
        <label htmlFor="description" style={labelStyle}>
          Description
        </label>
        <textarea
          name="description"
          id="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Task description"
          rows="4"
          style={{ ...inputStyle, resize: "vertical" }}
        />
      </div>

      <div>
        <label style={labelStyle}>Priority</label>
        <div style={barGroupStyle}>
          {["low", "medium", "high"].map((p) => (
            <div
              key={p}
              onClick={() => setForm({ ...form, priority: p })}
              style={barStyle(
                form.priority === p,
                p === "high"
                  ? "#dc3545"
                  : p === "medium"
                  ? "#ffc107"
                  : "#28a745"
              )}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <div>
        <label style={labelStyle}>Status</label>
        <div style={barGroupStyle}>
          {["pending", "in-progress", "completed"].map((s) => (
            <div
              key={s}
              onClick={() => setForm({ ...form, status: s })}
              style={barStyle(
                form.status === s,
                s === "completed"
                  ? "#28a745"
                  : s === "in-progress"
                  ? "#17a2b8"
                  : "#6c757d"
              )}
            >
              {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
      >
        + Add
      </button>
    </form>
  );
}
