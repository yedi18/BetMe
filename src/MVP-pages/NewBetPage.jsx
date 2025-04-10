import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, query, where, getDocs, updateDoc, arrayUnion, addDoc } from "firebase/firestore";
import { db } from "../mainPart/firebase";
import { getAuth } from "firebase/auth";
const progressPercents = {
  1: 25,
  2: 50,
  3: 75,
  4: 100,
};
const defaultAvatar = "https://www.gravatar.com/avatar/?d=mp&s=48";

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

  const handleNext = async () => {
    console.log("🎉 Launching confetti!");
      const confetti = (await import("canvas-confetti")).default;
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    setStep((s) => s + 1);
  };
  
  const handlePrev = () => (step === 1 ? onBack() : setStep((s) => s - 1));

  const handleFinish = async () => {
    const confetti = (await import("canvas-confetti")).default;
    confetti({
      particleCount: 300,
      spread: 180,
      startVelocity: 50,
      origin: { y: 0.6 },
    });
  
    // 🎈 בלונים – ניצור פיצוץ בלונים מכל המסך
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 60, zIndex: 0 };
  
    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();
  
      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }
  
      const particleCount = 5 * (timeLeft / duration);
      // בלונים יוצאים מ-2 צדדים
      confetti({
        ...defaults,
        particleCount,
        origin: { x: Math.random() * 0.2, y: Math.random() * 0.6 },
        colors: ["#ff6b6b", "#feca57", "#54a0ff", "#5f27cd"],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: 1 - Math.random() * 0.2, y: Math.random() * 0.6 },
        colors: ["#ff6b6b", "#feca57", "#54a0ff", "#5f27cd"],
      });
    }, 250);
  
    // ⏳ המשך עם שמירת ההתערבות
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      const finalDeadline = useDate ? form.deadline : form.smart.T;
      const finalForm = {
        ...form,
        deadline: finalDeadline,
        participants: form.participants.map((p) => p.nickname),
        createdAt: new Date(),
        createdBy: user?.email || "unknown",
      };
  
      await addDoc(collection(db, "bets"), finalForm);
      onFinish(finalForm);
    } catch (error) {
      console.error("Error adding bet:", error);
      alert("Something went wrong while saving the bet.");
    }
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

  const handleSearchChange = (e) => {
    const input = e.target.value;
    setSearchQuery(input);

    if (input.startsWith("@")) {
      const searchText = input.slice(1).trim();
      if (searchText !== "") {
        searchUsers(searchText);
      } else {
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  const sendInvite = async (nickname) => {
    const q = query(collection(db, "users"), where("nickname", "==", nickname));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const userDoc = snapshot.docs[0];
      const userRef = userDoc.ref;

      await updateDoc(userRef, {
        invitations: arrayUnion({
          from: "system", // אתה יכול להחליף ב-auth user
          betTitle: form.title,
          timestamp: new Date(),
        }),
      });
    }
  };

  const removeParticipant = (nickname) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.filter(p => p.nickname !== nickname)
    }));
  };

  const addParticipant = (userObj, isFake = false) => {
    const nickname = typeof userObj === 'string' ? userObj : userObj.nickname;
    const photoURL = typeof userObj === 'string' ? null : userObj.photoURL;
  
    if (!form.participants.some(p => p.nickname === nickname)) {
      setForm((prev) => ({
        ...prev,
        participants: [...prev.participants, { nickname, photoURL, isFake }],
      }));
      if (!isFake) {
        sendInvite(nickname);
      }
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
              <div style={styles.heroRow}>
              <img
                src="/images/mo_ch.png"
                alt="Character"
                style={styles.largeAvatar}
              />
            </div>


              <input
                placeholder="e.g. No sugar for 10 days"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
                style={styles.bigInput}
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

// ... הקוד נשמר כמו שהוא עד החלק של step === 3 ואז נעדכן את הצגת ההצעות וההצגה של התגים:

{step === 3 && (
  <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h2 style={styles.title}>👥 Choose Opponent</h2>
    <div style={{ position: "relative" }}>
      <input
        placeholder="Search by username (e.g. @shauli)"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{
          ...styles.input,
          borderBottomLeftRadius: searchResults.length > 0 ? 0 : 8,
          borderBottomRightRadius: searchResults.length > 0 ? 0 : 8,
        }}
      />
      {searchResults.length > 0 && searchQuery.startsWith("@") && (
        <div style={styles.dropdown}>
          {searchResults.map((user, idx) => (
            <div
              key={idx}
              style={styles.suggestionItem}
              onClick={() => addParticipant(user)}
            >
              <img
                src={user.photoURL || defaultAvatar}
                alt="avatar"
                style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 8 }}
              />
              @{user.nickname}
            </div>
          ))}
        </div>
      )}
    </div>

    <p style={{ marginTop: 16, marginBottom: 4 }}>Selected:</p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {form.participants.map((p, i) => {
        if (!p || typeof p !== "object") return null;

        const nickname = p.nickname ?? "unknown";
        const photoURL = p.photoURL || defaultAvatar;
        const isFake = p.isFake ?? false;

        return (
          <div key={i} style={styles.chip}>
            <img
              src={photoURL}
              alt="avatar"
              style={{ width: 24, height: 24, borderRadius: "50%", marginRight: 6 }}
            />
            <span style={styles.chipText}>@{nickname} {isFake ? "🌈" : ""}</span>
            <span
              onClick={() => removeParticipant(nickname)}
              style={styles.chipClose}
            >×</span>
          </div>
        );
      })}
    </div>

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
    padding: "32px",
    minHeight: "100vh",
    maxWidth: "500px",
    margin: "0 auto",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    background: "linear-gradient(to bottom right, #e0f7ff, #ffffff)",
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
  
// נוסיף בסוף בקובץ את העיצובים החדשים:
  dropdown: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderTop: "none",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    maxHeight: "150px",
    overflowY: "auto",
    zIndex: 10,
  },
  chip: {
    backgroundColor: "#e0f2fe",
    padding: "6px 12px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 500,
  },
  chipClose: {
    cursor: "pointer",
    backgroundColor: "#dc2626",
    color: "#fff",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "12px",
  },
  avatarSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "24px",
    position: "relative",
  },
  
  avatar: {
    width: "200px",       // או אפילו 240px אם אתה רוצה יותר
    height: "auto",
    objectFit: "contain",
    display: "block",
    margin: "0 auto",
  },
  heroRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "-47px",
    marginTop: "-50px", // ✨ זה מה שמוריד למטה

  },
  
  largeAvatar: {
    width: "600px",  // תוכל גם 200 אם אתה רוצה הכי גדול
    height: "auto",
    objectFit: "contain",
    pointerEvents: "none"

  },
  
  speechBubble: {
    backgroundColor: "#fff",
    padding: "12px 16px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontSize: "16px",
    maxWidth: "220px",
  }, 
  bigInput: {
    width: "100%",              // שומר על גודל יחסי למיכל
    maxWidth: "400px",          // מונע גלישה על מסכים קטנים
    margin: "0 auto 30px",      // מרכז את השדה אופקית
    display: "block",           // מאפשר margin אוטומטי לעבוד
    padding: "16px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "2px solid #d1d5db",
    outline: "none",
  },  
};

export default NewBet;