import React, { useState } from "react";

function NewBet() {
  const [participants, setParticipants] = useState("");
  const [specific, setSpecific] = useState("");
  const [measurable, setMeasurable] = useState("");
  const [achievable, setAchievable] = useState("");
  const [relevant, setRelevant] = useState("");
  const [timeBound, setTimeBound] = useState("");
  const [stake, setStake] = useState("money");
  const [judge, setJudge] = useState("");

  const handleSubmit = () => {
    const bet = {
      participants,
      smart: { specific, measurable, achievable, relevant, timeBound },
      stake,
      judge,
    };
    console.log("New Bet:", bet);
    alert("התערבות נוצרה בהצלחה!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎯 צור התערבות חדשה</h2>

        {/* בחירת משתתפים */}
        <label style={styles.label}>עם מי אתה מתערב?</label>
        <input
          style={styles.input}
          placeholder="כתוב כתובת מייל או שם..."
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />

        {/* SMART - שדות */}
        <label style={styles.label}>🎯 מטרה ברורה (Specific)</label>
        <input
          style={styles.input}
          placeholder="מה אתה רוצה להשיג?"
          value={specific}
          onChange={(e) => setSpecific(e.target.value)}
        />

        <label style={styles.label}>📏 מדידה (Measurable)</label>
        <input
          style={styles.input}
          placeholder="איך תמדוד הצלחה?"
          value={measurable}
          onChange={(e) => setMeasurable(e.target.value)}
        />

        <label style={styles.label}>🚀 הישגיות (Achievable)</label>
        <input
          style={styles.input}
          placeholder="איך תעמוד בזה?"
          value={achievable}
          onChange={(e) => setAchievable(e.target.value)}
        />

        <label style={styles.label}>🔗 רלוונטיות (Relevant)</label>
        <input
          style={styles.input}
          placeholder="למה זה חשוב?"
          value={relevant}
          onChange={(e) => setRelevant(e.target.value)}
        />

        <label style={styles.label}>⏰ זמן (Time-bound)</label>
        <input
          style={styles.input}
          placeholder="תוך כמה זמן תסיים?"
          value={timeBound}
          onChange={(e) => setTimeBound(e.target.value)}
        />

        {/* סוג התערבות */}
        <label style={styles.label}>🎭 סוג ההתערבות</label>
        <select
          style={styles.input}
          value={stake}
          onChange={(e) => setStake(e.target.value)}
        >
          <option value="money">💵 כסף</option>
          <option value="trust">🤝 אמון</option>
          <option value="embarrassment">😳 מבוכה</option>
        </select>

        {/* שופט */}
        <label style={styles.label}>⚖️ מי ישפוט?</label>
        <input
          style={styles.input}
          placeholder="שם או כתובת מייל"
          value={judge}
          onChange={(e) => setJudge(e.target.value)}
        />

        {/* כפתור */}
        <button style={styles.button} onClick={handleSubmit}>
          🚀 צור התערבות
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "500px",
    direction: "rtl",
  },
  title: {
    fontSize: "24px",
    color: "#1e40af",
    marginBottom: "20px",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginTop: "10px",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#1e40af",
    color: "#fff",
    fontSize: "16px",
    border: "none",
    borderRadius: "12px",
    marginTop: "20px",
    cursor: "pointer",
  },
};

export default NewBet;
