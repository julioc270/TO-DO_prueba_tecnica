# Prueba Técnica – Coppel

**Desarrollado por:** Julio Mendívil

Aplicación web para la gestión de tareas To-Do List

## Configuración del proyecto
Para ejecutar el proyecto localmente, es necesario configurar las variables de entorno del frontend y del backend.

### 1.frontend:

Dentro de la carpeta `frontend`, crea un archivo llamado `.env` con el siguiente contenido:

```env
VITE_API_URL=http://localhost:8080/api
```

### 2. Configuración del backend

Dentro de la carpeta `backend`, crea un archivo llamado `.env` con las siguientes variables:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
JWT_SECRET=
```

## Ejecución del proyecto

### Frontend

Desde la carpeta `frontend`, ejecuta:

```bash
npm install
npm run dev
```

### Backend

Desde la carpeta `backend`, ejecuta:

```bash
./mvnw spring-boot:run
```

