import { useState } from 'react'
import '../styles/pages/login.css'

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleLogin = async () => {
        setError("");

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                let errorMsg = "Credenciales incorrectas";
                try {
                    const errData = await response.json();
                    if (errData && errData.message) errorMsg = errData.message;
                } catch (e) {
                }
                setError(errorMsg);
                return;
            }

            const datos = await response.json();
            console.log("Login exitoso");
            console.log("TOKEN: ", datos.token);
            onLoginSuccess(datos.token);

        } catch (error) {
            console.error("Error al iniciar sesión:", error.message);
            setError(error.message || "Error de red. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="form-header">
                <h2>Iniciar Sesión</h2>
                <p>Ingresa tus credenciales para continuar</p>
            </div>

            <div className="form-group">
                <label htmlFor="login-email">Correo electrónico</label>
                <input
                    id="login-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                className="btn-primary"
                onClick={handleLogin}
                disabled={loading}
            >
                {loading ? "Ingresando..." : "Iniciar Sesión"}
            </button>

            {error && (
                <div className="error-message">{error}</div>
            )}
        </div>
    );
}

export default Login;