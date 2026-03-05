import { useState } from 'react'

function Register() {
    //Estados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    //Funcion register
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
            setError("La contraseña debe tener al menos 8 caracteres");
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

            setMessage("Registro exitoso. Ahora puedes iniciar sesión. :)");
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
        <>
            <h2>Register</h2>

            <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleRegister} disabled={loading}>{loading ? "Enviando..." : "Registrarse"}</button>

            {error && <p style={{ color: '#ff6b6b' }}>{error}</p>}
            {message && <p style={{ color: '#2ecc71' }}>{message}</p>}
        </>
    );
}

export default Register;