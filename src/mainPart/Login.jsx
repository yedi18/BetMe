//רכיב React שמציג מסך התחברות משתמש באמצעות Google. לאחר ההתחברות, הוא שולח את פרטי המשתמש לרכיב האב (App) דרך הפונקציה onLogin.
import { loginWithGoogle } from "./MAINד/firebase"; // פונקציית התחברות מוגדרת בקובץ firebase
import { useState } from "react";              // hook לניהול מצב (state)
import { motion } from "framer-motion";        // אנימציות כניסה רכות

function Login({ onLogin }) {
  const [error, setError] = useState(null);    // לאחסון שגיאות התחברות
  const [loading, setLoading] = useState(false); // למניעת לחיצות כפולות

  // פונקציה שמבצעת התחברות עם Google
  const handleLogin = async () => {
    if (loading) return;       // מונע התחברות כפולה
    setLoading(true);          // מציין שהתחברות בעיצומה

    try {
      const result = await loginWithGoogle();  // התחברות דרך Google
      const user = result.user;
      onLogin(user);          // שליחת המשתמש לרכיב האב
    } catch (err) {
      console.error("שגיאה בהתחברות:", err);
      setError("התחברות נכשלה. נסה שוב.");
    } finally {
      setLoading(false);      // מסיים תהליך התחברות
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}           // מצב התחלה באנימציה
      animate={{ opacity: 1, y: 0 }}             // מצב סופי באנימציה
      transition={{ duration: 0.7 }}             // משך האנימציה
      style={{
        direction: "rtl",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        width: "90%",
        maxWidth: "500px",
      }}
    >
      {/* כותרת של המסך */}
      <h1 style={{
        backgroundColor: "#3b82f6",
        color: "white",
        padding: "20px 40px",
        borderRadius: "40px",
        fontSize: "2.4rem",
        marginBottom: "30px",
        display: "inline-block",
        boxShadow: "0 5px 20px rgba(59,130,246,0.4)"
      }}>
        🎯 ברוך הבא ל־<b>BetMe</b>
      </h1>

      {/* כפתור התחברות */}
      <button
        onClick={handleLogin}
        style={{
          padding: "15px 30px",
          fontSize: "18px",
          borderRadius: "30px",
          border: "2px solid #3b82f6",
          backgroundColor: "#ffffff",
          color: "#3b82f6",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.3s",
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
        }}
        // אפקט hover
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#3b82f6";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#3b82f6";
        }}
      >
        🚀 התחבר עם Google
      </button>

      {/* הודעת שגיאה במקרה הצורך */}
      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}
    </motion.div>
  );
}

export default Login;
