import React from "react";

const SettingsPage = () => (
  <div style={styles.container}>
    <h2 style={styles.title}>⚙️ Settings</h2>

    <div style={styles.settingItem}>
      <label>🌙 Dark Mode</label>
      <input type="checkbox" />
    </div>

    <div style={styles.settingItem}>
      <label>🌐 Language</label>
      <select>
        <option>English</option>
        <option>עברית</option>
      </select>
    </div>

    <div style={styles.settingItem}>
      <label>🗑️ Delete Account</label>
      <button style={styles.dangerButton}>Delete</button>
    </div>
  </div>
);

const styles = {
  container: {
    padding: "30px",
  },
  title: {
    fontSize: "24px",
    color: "#1e3a8a",
    marginBottom: "20px",
    textAlign: "center",
  },
  settingItem: {
    marginBottom: "20px",
  },
  dangerButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "6px",
  },
};

export default SettingsPage;
