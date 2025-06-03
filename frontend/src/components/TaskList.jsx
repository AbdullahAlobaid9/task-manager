import { useEffect, useState } from "react";
import API from "../api/axios";

export default function TaskList({
  tasks = [],
  onTaskUpdated = () => {},
  selectedPriority = "",
  selectedStatus = "",
  searchQuery = "",
}) {
  const handleUpdate = async (taskId, field, value) => {
    try {
      await API.patch(`tasks/${taskId}/`, { [field]: value });
      setTimeout(onTaskUpdated, 150);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };
  const handleDelete = async (id) => {
    await API.delete(`tasks/${id}/`);
    onTaskUpdated();
  };

  const getPriorityColor = (value) => {
    return value === "high"
      ? "#dc3545"
      : value === "medium"
      ? "#ffc107"
      : "#28a745";
  };

  const getStatusColor = (value) => {
    return value === "completed"
      ? "#28a745"
      : value === "in-progress"
      ? "#17a2b8"
      : "#6c757d";
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "20px",
    marginBottom: "10px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const titleStyle = {
    fontWeight: "600",
    fontSize: "20px",
    color: "#333",
    marginBottom: "10px",
  };

  const descriptionStyle = {
    backgroundColor: "#f9f9f9",
    padding: "12px",
    borderRadius: "6px",
    color: "#444",
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
    overflowWrap: "anywhere",
  };

  const labelGroupStyle = {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    maxWidth: "50%",
    overflow: "hidden",
    wordBreak: "break-word",
  };

  const barStyle = (active, color) => ({
    padding: "8px 12px",
    borderRadius: "20px",
    cursor: "pointer",
    backgroundColor: active ? color : "#e0e0e0",
    color: active ? "white" : "#333",
    border: "none",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "background-color 0.3s",
    whiteSpace: "nowrap",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  });
  return (
    <div>
      {tasks
        .filter((task) => {
          const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase());

          const matchesStatus = selectedStatus
            ? task.status === selectedStatus
            : true;
          const matchesPriority = selectedPriority
            ? task.priority === selectedPriority
            : true;

          return matchesSearch && matchesStatus && matchesPriority;
        })
        .map((task) => (
          <div key={task.id} style={cardStyle}>
            {/* Top: Title + Delete */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div style={titleStyle}>{task.title}</div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  backgroundColor: "#f8d7da",
                  color: "#721c24",
                  border: "none",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f5c6cb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f8d7da")
                }
                title="Delete Task"
              >
                🗑
              </button>
            </div>

            {/* Description */}
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  marginBottom: "6px",
                }}
              >
                Description:
              </div>
              <div style={descriptionStyle}>{task.description}</div>
            </div>

            {/* Priority */}
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                Priority:
              </div>
              <div style={labelGroupStyle}>
                {["low", "medium", "high"].map((p) => (
                  <div
                    key={p}
                    style={{
                      ...barStyle(task.priority === p, getPriorityColor(p)),
                    }}
                    onClick={() => handleUpdate(task.id, "priority", p)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(0.9)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "brightness(1)")
                    }
                  >
                    {p.charAt(0).toUpperCase() + p.slice(1)}
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div style={{ marginTop: "10px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "6px" }}>
                Status:
              </div>
              <div style={labelGroupStyle}>
                {["pending", "in-progress", "completed"].map((s) => (
                  <div
                    key={s}
                    style={{
                      ...barStyle(task.status === s, getStatusColor(s)),
                    }}
                    onClick={() => handleUpdate(task.id, "status", s)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.filter = "brightness(0.9)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.filter = "brightness(1)")
                    }
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1).replace("-", " ")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
