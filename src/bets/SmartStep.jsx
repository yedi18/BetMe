import React from "react";

const smartFields = [
  {
    key: "S",
    label: "🎯 What exactly do you want to achieve?",
    tooltip: "Be specific and clear – for example: 'Do 30 push-ups in one set'.",
    placeholder: "e.g. Learn 10 new words in Spanish"
  },
  {
    key: "M",
    label: "📏 How will you measure progress?",
    tooltip: "Describe how you'll track it – by time, number, repetition, etc.",
    placeholder: "e.g. Reach 60 seconds of handstand"
  },
  {
    key: "A",
    label: "💪 Is this achievable for you?",
    tooltip: "Make sure it's realistic – aim high but stay grounded.",
    placeholder: "e.g. Yes, if I practice daily"
  },
  {
    key: "R",
    label: "🧠 Why is it relevant to you?",
    tooltip: "Explain the motivation behind this goal.",
    placeholder: "e.g. I want to improve my balance and focus"
  },
  {
    key: "T",
    label: "⏰ When do you want to complete it?",
    tooltip: "Choose a reasonable time frame to achieve your goal.",
    placeholder: "e.g. In 3 weeks"
  }
];

const SmartStep = ({ smart, onSmartChange }) => {
  const [activeTip, setActiveTip] = React.useState(null);

  return (
    <div>
      <h2 style={styles.title}>🎯 SMART Goal Setup</h2>
      {smartFields.map(({ key, label, tooltip, placeholder }) => (
        <div key={key} style={{ marginBottom: 16 }}>
          <div style={styles.smartLabelRow}>
            <label style={styles.label}>{label}</label>
            <button
              onClick={() => setActiveTip(activeTip === key ? null : key)}
              style={styles.helpButton}
            >
              ❔
            </button>
          </div>
          {activeTip === key && <p style={styles.tip}>{tooltip}</p>}
          <input
            type="text"
            value={smart[key]}
            onChange={(e) => onSmartChange(key, e.target.value)}
            placeholder={placeholder}
            style={styles.input}
          />
        </div>
      ))}
    </div>
  );
};

const styles = {
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: "20px",
    textAlign: "center",
  },
  smartLabelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  helpButton: {
    background: "none",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    color: "#2563eb",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#0f172a",
  },
  tip: {
    fontSize: "12px",
    color: "#334155",
    marginBottom: "6px",
    fontStyle: "italic",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "6px",
  },
};

export default SmartStep;
