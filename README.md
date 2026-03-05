# Auth Frontend

Frontend de autenticación hecho con **React 19** y **Vite 7**. Interfaz moderna, limpia y responsive para registro, login y gestión de perfil con JWT.

## ¿Qué es?

Un frontend completo de autenticación que maneja:
- **Inicio de sesión** con email y contraseña
- **Registro de usuarios** con validaciones en tiempo real
- **Perfil protegido** con datos del usuario autenticado
- **Sesión persistente** con JWT en localStorage
- **Cierre de sesión** seguro

Diseñado para conectarse al [Auth Service API](https://github.com/Johanestrada/auth-service-springboot) como backend.

## Stack Tecnológico

- **React 19** - Librería de UI
- **Vite 7** - Bundler ultrarrápido
- **CSS Vanilla** - Estilos sin frameworks
- **Inter (Google Fonts)** - Tipografía moderna
- **Fetch API** - Comunicación con el backend
- **localStorage** - Persistencia de sesión

## Características Principales

✅ **Autenticación JWT** - Login y registro conectados al backend  
✅ **Validaciones** - Email válido, campos requeridos, contraseña mínima  
✅ **Sesión persistente** - El token se mantiene al recargar la página  
✅ **Manejo de errores** - Mensajes claros para el usuario  
✅ **UI moderna** - Diseño limpio con animaciones y transiciones  
✅ **Responsive** - Se adapta a cualquier pantalla  
✅ **Código organizado** - Separación por páginas y estilos  

## Pantallas

### Login
- Formulario con email y contraseña
- Validación de formato de email
- Mensajes de error del servidor
- Estado de carga mientras procesa

### Registro
- Formulario con validación en tiempo real
- Contraseña mínima de 8 caracteres
- Mensaje de éxito al registrarse
- Manejo de errores (email duplicado, etc.)

### Perfil
- Avatar generado con la inicial del email
- Datos del usuario autenticado
- Botón de cerrar sesión

## Instalación y Uso

### Requisitos
- Node.js 18+
- Backend corriendo en `http://localhost:8080`

### Iniciar el proyecto
```bash
# Clonar y entrar al proyecto
git clone <repo>
cd auth-frontend

# Instalar dependencias y ejecutar
npm install
npm run dev

# La app estará en http://localhost:5173
```

## Conexión con el Backend

Este frontend consume los siguientes endpoints del [Auth Service API](https://github.com/Johanestrada/auth-service-springboot):

```
POST   /auth/login        → Iniciar sesión y obtener token JWT
POST   /auth/register     → Registrar nuevo usuario
GET    /user/profile      → Obtener datos del usuario autenticado
```

Todas las peticiones protegidas envían el header:
```
Authorization: Bearer <token>
```

## Estructura del Proyecto

```
src/
├── pages/            → Componentes de cada pantalla
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Profile.jsx
├── styles/           → CSS organizado por componente
│   ├── globals.css
│   ├── components.css
│   └── pages/
├── App.jsx           → Navegación y lógica principal
└── main.jsx          → Punto de entrada
```

## Contacto

johan.manuel.estrada.plaza@gmail.com

---

## Autor

Johan Estrada
