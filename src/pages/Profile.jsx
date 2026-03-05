import { useEffect, useState } from "react";

function Profile() {
    //estados
    const [user, setUser] = useState(null);

    //funcion para obtener el perfil del usuario
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
        <div>
            {user ? (
                <p>Usuario: {user.email}</p>
            ) : (
                <p>Cargando perfil...</p>
            )}

            <button onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
            }}>
                Cerrar sesión
            </button>
        </div>
    );
}

export default Profile;