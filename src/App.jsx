import { useState, useEffect } from "react";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";

function App() {
  const [showRegister, setShowRegister] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setToken(savedToken);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  return (
    <div className="container">
      <div className="card">
        {token ? (
          <Profile />
        ) : showRegister ? (
          <Register />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {!token && (
          <button
            style={{ marginTop: "20px", width: "100%" }}
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "Volver al Login" : "Ir a Registro"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;