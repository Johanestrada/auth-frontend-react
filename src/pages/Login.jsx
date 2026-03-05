import { useState } from 'react'


function Login({ onLoginSuccess }) {
    //Estados
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    //Funcion login
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
        <>
            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin} disabled={loading}>{loading ? "Enviando..." : "Iniciar Sesión"}</button>

            {error && (
                <div style={{ color: '#ff6b6b', marginTop: 12 }}>{error}</div>
            )}
        </>
    );

}
export default Login;