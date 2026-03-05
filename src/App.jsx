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
      <div className="card fade-in">
        {token ? (
          <Profile />
        ) : showRegister ? (
          <Register />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}

        {!token && (
          <button
            className="btn-secondary"
            onClick={() => setShowRegister(!showRegister)}
          >
            {showRegister ? "← Volver al Login" : "Crear una cuenta"}
          </button>
        )}
      </div>
    </div>
  );
}

export default App;