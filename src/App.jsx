import React, { useState } from "react";
import { signup, login } from "./auth";
import { getAuth, signOut } from "firebase/auth";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [word, setWord] = useState("");
  const [translated, setTranslated] = useState("");
  const [targetLang, setTargetLang] = useState("hi");

  const auth = getAuth();

  const handleSignup = async () => {
    try {
      const res = await signup(email, password);
      setUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      setUser(res.user);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleTranslate = async () => {
    try {
      const res = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(word)}`
      );
      const data = await res.json();
      const result = data[0].map(item => item[0]).join("");
      setTranslated(result);
    } catch {
      setTranslated("⚠️ Translation failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        <h1 style={styles.title}>Language App</h1>

        {!user ? (
          <>
            {/* Alphabet Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/2436/2436874.png"
              alt="alphabet"
              style={styles.image}
            />

            <p style={styles.languages}>
              ABC • अ आ इ • Hola • Bonjour • Español
            </p>

            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <div>
              <button style={styles.btn} onClick={handleSignup}>
                Signup
              </button>
              <button style={styles.btnOutline} onClick={handleLogin}>
                Login
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Alphabet Language Image */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3898/3898150.png"
              alt="letters"
              style={styles.image}
            />

            <h2 style={styles.welcome}>Translate</h2>

            <select
              style={styles.dropdown}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="hi">Hindi</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>

            <input
              style={styles.input}
              type="text"
              placeholder="Enter word"
              value={word}
              onChange={(e) => setWord(e.target.value)}
            />

            <button style={styles.btn} onClick={handleTranslate}>
              Translate
            </button>

            {translated && (
              <div style={styles.resultBox}>
                <p style={styles.resultText}>{translated}</p>
              </div>
            )}

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #ffd1dc, #ff9aa2)",
    fontFamily: "Poppins, sans-serif"
  },
  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    width: "350px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(255,105,180,0.3)"
  },
  title: {
    marginBottom: "10px",
    color: "#ff1493",
    fontWeight: "bold"
  },
  image: {
    width: "110px",
    marginBottom: "10px"
  },
  languages: {
    fontSize: "14px",
    color: "#ff69b4",
    marginBottom: "10px",
    fontWeight: "bold"
  },
  welcome: {
    color: "#ff1493",
    fontWeight: "bold"
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "10px",
    border: "1px solid #ffb6c1"
  },
  dropdown: {
    width: "100%",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px solid #ffb6c1"
  },
  btn: {
    background: "linear-gradient(45deg, #ff1493, #ff69b4)",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    margin: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  btnOutline: {
    background: "#fff",
    border: "2px solid #ff1493",
    color: "#ff1493",
    padding: "10px",
    borderRadius: "10px",
    margin: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  resultBox: {
    marginTop: "15px",
    padding: "15px",
    borderRadius: "15px",
    background: "linear-gradient(45deg, #ffc0cb, #ffb6c1)",
    boxShadow: "0 0 15px rgba(255,105,180,0.4)"
  },
  resultText: {
    fontSize: "22px",
    fontWeight: "900",
    color: "#ff1493",
    letterSpacing: "1px",
    textShadow: "0 0 10px rgba(255,20,147,0.7)"
  },
  logout: {
    marginTop: "15px",
    background: "#ff1493",
    color: "#fff",
    padding: "10px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;