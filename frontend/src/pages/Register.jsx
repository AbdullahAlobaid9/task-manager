import { useState } from "react";
import API from "../api/axios";
import "../AuthStyles.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("users/register/", form);
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed.");
    }
  };

  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "grid",
    placeItems: "center",
    backgroundColor: "#f0f2f5",
  };

  const formStyle = {
    display: "grid",
    gap: "15px",
    gridTemplateColumns: "1fr",
    padding: "30px",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Register</h2>
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={inputStyle}
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Register
        </button>
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </form>
    </div>
  );
}
