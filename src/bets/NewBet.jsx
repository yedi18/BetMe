import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../mainPart/firebase";
import SmartStep from "./SmartStep";

const progressPercents = {
  1: 25,
  2: 50,
  3: 75,
  4: 100,
};

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
  const [useDate, setUseDate] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSmartChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      smart: { ...prev.smart, [key]: value },
    }));
  };

  const handleNext = () => setStep((s) => s + 1);
  const handlePrev = () => (step === 1 ? onBack() : setStep((s) => s - 1));

  const handleFinish = () => {
    const finalDeadline = useDate ? form.deadline : form.smart.T;
    const finalForm = { ...form, deadline: finalDeadline };
    onFinish(finalForm);
  };

  const searchUsers = async (queryText) => {
    const q = query(
      collection(db, "users"),
      where("nickname", ">=", queryText),
      where("nickname", "<=", queryText + "\uf8ff")
    );
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map(doc => doc.data());
    setSearchResults(results);
  };
  

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") searchUsers(searchQuery);
      else setSearchResults([]);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    const queryText = e.target.value;
    setSearchQuery(queryText);
  
    if (queryText.startsWith("@")) {
      const searchText = queryText.slice(1);  // הסרת ה-@ מהחיפוש
      if (searchText) {
        searchUsers(searchText);  // חיפוש אחרי nickname
      } else {
        setSearchResults([]);  // אם לא הוקלד שום דבר אחרי @, לא להציג תוצאות
      }
    } else {
      setSearchResults([]);  // אם אין @, לא לבצע חיפוש
    }
  };
  
  
  const addParticipant = (nickname, isFake = false) => {
    if (!form.participants.some(p => p.nickname === nickname)) {
      setForm((prev) => ({
        ...prev,
        participants: [...prev.participants, { nickname, isFake }],
      }));
    }
    setSearchQuery("");
    setSearchResults([]);
  };
  
  

  return (
    <div style={{ ...styles.container, background: "linear-gradient(to bottom right, #e0f7ff, #ffffff)" }}>
      <div style={styles.progressBarOuter}>
        <div style={{ ...styles.progressBarInner, width: `${progressPercents[step]}%` }}></div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 style={styles.title}>📝 Name your challenge</h2>
            <p style={styles.subtitle}>Give your bet a meaningful title</p>
            <input
              placeholder="e.g. No sugar for 10 days"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              style={styles.input}
              required
            />
            <div style={styles.navRow}>
              <button onClick={handlePrev} style={styles.backButton}>Back</button>
              <button onClick={handleNext} style={styles.button}>Next</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SmartStep smart={form.smart} onSmartChange={handleSmartChange} />

            <label style={{ marginTop: 8 }}>📅 Or set a specific date:</label>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <input
                type="checkbox"
                checked={useDate}
                onChange={() => setUseDate(!useDate)}
              />
              <input
                type="date"
                disabled={!useDate}
                value={form.deadline}
                onChange={(e) => handleChange("deadline", e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.navRow}>
              <button onClick={handlePrev} style={styles.backButton}>Back</button>
              <button onClick={handleNext} style={styles.button}>Next</button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 style={styles.title}>👥 Choose Opponent</h2>
            <input
              placeholder="Search by username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={styles.input}
            />
            {searchResults.length > 0 ? (
              searchResults.map((user, idx) => (
                <div key={idx} style={styles.suggestionItem} onClick={() => addParticipant(user.username)}>
                  ✅ @{user.username}
                </div>
              ))
            ) : (
              searchQuery && (
                <div style={styles.suggestionItem} onClick={() => addParticipant(searchQuery, true)}>
                  ➕ Add '{searchQuery}' anyway
                </div>
              )
            )}
            <p>Selected:
              {form.participants.map((p, i) => (
                <span key={i} style={{ marginInline: 4 }}>
                  @{p.username} {p.isFake ? "🌈" : ""}
                </span>
              ))}
            </p>
            <div style={styles.navRow}>
              <button onClick={handlePrev} style={styles.backButton}>Back</button>
              <button onClick={handleNext} style={styles.button}>Next</button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h2 style={styles.title}>📌 Final Details</h2>
            <label>Assign a Judge (optional):</label>
            <input
              placeholder="e.g. @username or bot"
              value={form.judge}
              onChange={(e) => handleChange("judge", e.target.value)}
              style={styles.input}
            />

            <label>Additional Notes:</label>
            <textarea
              placeholder="Describe punishments, rewards, or rules"
              value={form.notes}
              onChange={(e) => handleChange("notes", e.target.value)}
              style={styles.input}
            />

            <div style={styles.navRow}>
              <button onClick={handlePrev} style={styles.backButton}>Back</button>
              <button onClick={handleFinish} style={styles.button}>Finish 🎉</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    maxWidth: "480px",
    margin: "0 auto",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1e40af",
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
  suggestionItem: {
    backgroundColor: "#f0f9ff",
    padding: "8px 12px",
    marginBottom: "6px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "1px solid #ccc",
  },
  progressBarOuter: {
    height: "6px",
    backgroundColor: "#e5e7eb",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  progressBarInner: {
    height: "100%",
    backgroundColor: "#3b82f6",
    transition: "width 0.3s ease",
  },
};

export default NewBet;