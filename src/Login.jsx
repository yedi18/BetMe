import { loginWithGoogle } from "./firebase";
import { useState } from "react";
import { motion } from "framer-motion";

function Login({ onLogin }) {
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  if (loading) return; // מונע לחיצה כפולה
  setLoading(true);

  try {
    const result = await loginWithGoogle();
    const user = result.user;
    onLogin(user);
  } catch (err) {
    console.error("שגיאה בהתחברות:", err);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        direction: "rtl",        // יישור לימין
        textAlign: "center",     // ממרכז טקסט וכפתורים
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
      {/* כותרת */}
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

      {/* כפתור */}
      <br />
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

      {error && (
        <p style={{ color: "red", marginTop: "20px" }}>
          {error}
        </p>
      )}
    </motion.div>
  );
}

export default Login;
