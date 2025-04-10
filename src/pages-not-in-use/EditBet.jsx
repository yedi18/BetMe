import React, { useState } from "react";

export default function EditBet({ bet, onSave, onBack }) {
  const [form, setForm] = useState({
    title: bet.title || "",
    opponent: bet.opponent || "",
    date: bet.date || "",
    status: bet.status || "In Progress",
    yourProgress: bet.yourProgress || 0,
    opponentProgress: bet.opponentProgress || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(form);
    onBack();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>✏️ Edit Bet</h2>

      <div style={styles.field}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
      </div>

      <div style={styles.field}>
        <label>Opponent</label>
        <input name="opponent" value={form.opponent} onChange={handleChange} />
      </div>

      <div style={styles.field}>
        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
      </div>

      <div style={styles.field}>
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Failed</option>
        </select>
      </div>

      <div style={styles.field}>
        <label>Your Progress</label>
        <input type="number" name="yourProgress" value={form.yourProgress} onChange={handleChange} min={0} max={100} />
      </div>

      <div style={styles.field}>
        <label>Opponent Progress</label>
        <input type="number" name="opponentProgress" value={form.opponentProgress} onChange={handleChange} min={0} max={100} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSubmit} style={styles.saveBtn}>💾 Save</button>
        <button onClick={onBack} style={styles.cancelBtn}>⬅ Back</button>
      </div>
    </div>
  );
}

const styles = {
  field: {
    marginBottom: "16px",
    display: "flex",
    flexDirection: "column",
  },
  saveBtn: {
    backgroundColor: "#22c55e",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelBtn: {
    backgroundColor: "#f3f4f6",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }
};
