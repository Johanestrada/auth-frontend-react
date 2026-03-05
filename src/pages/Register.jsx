import { useState } from 'react'
import '../styles/pages/register.css'

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleRegister = async () => {
        setMessage("");
        setError("");

        if (!email || !password) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Por favor, introduce un correo electrónico válido.");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                let errorMsg = "Error al registrar usuario";
                try {
                    const errData = await response.json();
                    if (errData && errData.message) errorMsg = errData.message;
                } catch (e) {
                    // ignore parse errors
                }
                setError(errorMsg);
                return;
            }

            setMessage("¡Registro exitoso! Ahora puedes iniciar sesión.");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error("Error al registrar usuario:", err.message);
            setError(err.message || "Error al registrar usuario. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="form-header">
                <h2>Crear Cuenta</h2>
                <p>Regístrate para empezar</p>
            </div>

            <div className="form-group">
                <label htmlFor="register-email">Correo electrónico</label>
                <input
                    id="register-email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="register-password">Contraseña</label>
                <input
                    id="register-password"
                    type="password"
                    placeholder="Mínimo 8 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button
                className="btn-primary"
                onClick={handleRegister}
                disabled={loading}
            >
                {loading ? "Registrando..." : "Crear Cuenta"}
            </button>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
        </div>
    );
}

export default Register;