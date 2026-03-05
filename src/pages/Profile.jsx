import { useEffect, useState } from "react";
import '../styles/pages/profile.css'

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch("http://localhost:8080/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "content-type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }

                const data = await response.json();
                console.log("Perfil:", data);
                setUser(data);
            } catch (error) {
                console.error("Error al obtener el perfil:", error.message);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-page">
            {user ? (
                <>
                    <div className="profile-avatar">
                        {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                    </div>

                    <p className="profile-greeting">¡Bienvenido!</p>
                    <p className="profile-subtitle">Tu sesión está activa</p>

                    <div className="profile-info">
                        <p className="profile-label">Email</p>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </>
            ) : (
                <div className="profile-loading">
                    <span className="spinner"></span>
                    Cargando perfil...
                </div>
            )}

            <div className="profile-divider"></div>

            <button
                className="btn-danger"
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                }}
            >
                Cerrar Sesión
            </button>
        </div>
    );
}

export default Profile;