# Prueba Técnica Node.js/React

## Descripción

Este proyecto consiste en una aplicación Full Stack desarrollada como parte de una prueba técnica. Incluye una API REST construida con Node.js y una interfaz de usuario basada en React. La aplicación implementa autenticación con JWT, operaciones CRUD, y seguridad para proteger contra SQL Injection y XSS. Además, está dockerizada para facilitar su despliegue.

## Requisitos previos

- Tener instalado Docker y Docker Compose.
- Node.js (en caso de realizar pruebas locales fuera de contenedores).

## Instalación y despliegue

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/JCValeroVergara/konecta-prueba
   cd konecta-prueba
   ```

2. **Crear el archivo `.env` en la raíz del proyecto**
   Copiar el contenido del archivo `.env.example` (si existe) o definir las siguientes variables en el archivo `.env`:

   ```env
   DB_NAME=nombre_base_datos
   DB_USER=usuario_base_datos
   DB_PASSWORD=contraseña_base_datos
   ```

3. **Iniciar la aplicación con Docker Compose**

   ```bash
   docker-compose up -d
   ```

4. **Cargar datos de ejemplo en la base de datos**
   Dentro del contenedor del servidor, ejecutar el siguiente comando para poblar la base de datos con datos iniciales:

   ```bash
   docker exec -it konecta-server npm run seed
   ```

## Estructura de servicios en Docker Compose

- **db**: Servicio de base de datos PostgreSQL.
  - Imagen: `postgres:15.3`
  - Puertos: `5432:5432`
  - Variables de entorno: Configuradas en el archivo `.env`.
  - Volumen: `./server/postgres:/var/lib/postgresql/data`

- **server**: Servicio del backend.
  - Contexto de construcción: `./server`
  - Puerto: `4000:4000`
  - Variables de entorno: Configuradas en el archivo `.env`.
  - Dependencias: `db`

- **client**: Servicio del frontend.
  - Contexto de construcción: `./client`
  - Puerto: `80:80`
  - Dependencias: `server`

## Características del proyecto

### Backend

- **Autenticación y Autorización**:
  - Registro e inicio de sesión con JWT.
  - Roles diferenciados: `Empleado` (consultar) y `Administrador` (consultar, insertar, eliminar).
- **Operaciones CRUD**:
  - Empleados: Consultar e insertar.
  - Solicitudes: Consultar, insertar y eliminar (solo administradores).
- **Seguridad**:
  - Uso de ORM/consultas parametrizadas para prevenir SQL Injection.
  - Saneamiento de entradas para evitar XSS.
- **Optimizaciones**:
  - Implementación de paginación y filtrado.

### Frontend

- **Interfaz de Usuario**:
  - Vistas para operaciones CRUD.

  - Visualización diferenciada por roles.
- **Estado y Rendimiento**:
  - Manejo de estado global con Context API.
  - Optimización de carga con Lazy Loading.

### Pruebas

- Backend: Pruebas unitarias y de integración con Jest.
- Frontend: Pruebas básicas con React Testing Library.

### Dockerización

- `Dockerfile` para backend y frontend.
- `docker-compose.yml` para levantar todos los servicios.

## Secuencia de inicio

1. Clonar el repositorio.
2. Crear y configurar el archivo `.env`.
3. Levantar los servicios con Docker Compose.
4. Poblar la base de datos con datos iniciales.

## Mejores prácticas

- **Seguridad**: Uso de JWT para autenticación, consultas parametrizadas y sanitización de entradas.
- **Estructura de código**: Código modular y uso de controladores para mantener la escalabilidad.
- **Pruebas**: Implementación de pruebas automatizadas para garantizar calidad.
  - Backend: Ejecutar pruebas con el comando `npm run test` en el directorio del servidor.
  - Frontend: Ejecutar pruebas con el comando `npm run test` en el directorio del cliente.


## Consideraciones adicionales

- Asegúrese de que los puertos `5432`, `4000` y `80` estén libres antes de iniciar los servicios.
- Para modificar configuraciones de la base de datos o servicios, edite el archivo `.env` y/o `docker-compose.yml` según sea necesario.