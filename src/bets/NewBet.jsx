import React, { useState } from "react";

const NewBet = ({ onBack, onFinish }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    smart: { S: "", M: "", A: "", R: "", T: "1 week" },
    deadline: "",
    participants: [],
    judge: "",
    notes: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSmartChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      smart: { ...prev.smart, [key]: value },
    }));
  };

  const handleNext = () => {
    setStep((s) => s + 1);
  };

  const handlePrev = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep((s) => s - 1);
    }
  };

  console.log("Current Step:", step);

  return (
    <div style={styles.container}>
      {step === 1 && (
        <div>
          <h2 style={styles.title}>type name...</h2>
          <p style={styles.subtitle}>#1 Define the competition end goal</p>
          <input
            placeholder="Eat less sugar, Exercise 3x..."
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            style={styles.input}
          />
          <div style={styles.navRow}>
            <button onClick={handlePrev} style={styles.backButton}>Back</button>
            <button onClick={handleNext} style={styles.button}>Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 style={styles.title}>SMART Goal Setup</h2>
          {Object.entries({
            S: "Specific - What exactly?",
            M: "Measurable - How to measure?",
            A: "Achievable - Can you do it?",
            R: "Relevant - Why important?",
            T: "Time-bound - When to finish?",
          }).map(([key, label]) => (
            <div key={key} style={{ marginBottom: 10 }}>
              <label>{label}</label>
              <input
                placeholder={label}
                value={form.smart[key]}
                onChange={(e) => handleSmartChange(key, e.target.value)}
                style={styles.input}
              />
            </div>
          ))}

          <label>Finish in:</label>
          <select
            value={form.deadline}
            onChange={(e) => handleChange("deadline", e.target.value)}
            style={styles.input}
          >
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="1 month">1 month</option>
          </select>

          <label>Or choose a date:</label>
          <input
            type="date"
            onChange={(e) => handleChange("deadline", e.target.value)}
            style={styles.input}
          />

          <div style={styles.navRow}>
            <button onClick={handlePrev} style={styles.backButton}>Back</button>
            <button onClick={handleNext} style={styles.button}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 style={styles.title}>Choose Participants</h2>
          <p style={styles.subtitle}>Coming soon: searchable friends list</p>
          <input
            placeholder="Add usernames or emails..."
            onChange={(e) => handleChange("participants", e.target.value.split(","))}
            style={styles.input}
          />
          <div style={styles.navRow}>
            <button onClick={handlePrev} style={styles.backButton}>Back</button>
            <button onClick={handleNext} style={styles.button}>Next</button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 style={styles.title}>Final Touches</h2>
          <label>Choose Judge (or leave blank):</label>
          <input
            placeholder="@username or 'bot'"
            value={form.judge}
            onChange={(e) => handleChange("judge", e.target.value)}
            style={styles.input}
          />

          <label>Notes / rules / conditions:</label>
          <textarea
            placeholder="Describe punishment, reward, rules..."
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            style={styles.input}
          />

          <div style={styles.navRow}>
            <button onClick={handlePrev} style={styles.backButton}>Back</button>
            <button onClick={() => onFinish(form)} style={styles.button}>Finish 🎉</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#e0f2fe",
    minHeight: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "10px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginBottom: "12px",
  },
  button: {
    backgroundColor: "#2563eb",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  backButton: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
};

export default NewBet;