# 🎮 GameTracker

Una aplicación web completa para crear tu propia biblioteca personal de videojuegos, con la posibilidad de gestionarlos, escribir reseñas y llevar estadísticas de tu experiencia como gamer.

## 🚀 Tecnologías

### Frontend
- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos modernos
- **shadcn/ui** - Componentes de UI

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB

## 📦 Instalación

### Frontend (Next.js)

\`\`\`bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Abrir http://localhost:3000
\`\`\`

### Backend (Express + MongoDB)

\`\`\`bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Edita .env con tu connection string de MongoDB

# Ejecutar en modo desarrollo
npm run dev

# El servidor correrá en http://localhost:5000
\`\`\`

## 🗄️ Configuración de MongoDB

### Opción 1: MongoDB Local

\`\`\`bash
# Instalar MongoDB localmente
# macOS:
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community

# La URI será: mongodb://localhost:27017/gametracker
\`\`\`

### Opción 2: MongoDB Atlas (Cloud)

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un nuevo cluster gratuito
3. Configura un usuario de base de datos
4. Añade tu IP a la whitelist
5. Obtén tu connection string y añádelo en `.env`

\`\`\`
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gametracker
\`\`\`

## 🎯 Funcionalidades

### ✅ Gestión de Juegos
- Ver biblioteca completa con portadas
- Agregar nuevos juegos
- Editar información de juegos
- Eliminar juegos
- Marcar estado (Jugando, Completado, Pendiente, Deseado)
- Sistema de puntuación con estrellas
- Registrar horas jugadas
- Búsqueda y filtros

### ✅ Sistema de Reseñas
- Escribir reseñas detalladas
- Editar reseñas existentes
- Eliminar reseñas
- Ver todas las reseñas
- Buscar reseñas

### ✅ Dashboard de Estadísticas
- Total de juegos en biblioteca
- Horas totales jugadas
- Rating promedio
- Juegos completados
- Distribución por estado
- Géneros favoritos
- Top juegos mejor valorados

## 📁 Estructura del Proyecto

\`\`\`
gametracker/
├── app/                    # Frontend Next.js
│   ├── api/               # API Routes (mock data)
│   ├── reviews/           # Página de reseñas
│   ├── stats/             # Página de estadísticas
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globales
├── components/            # Componentes React
│   ├── ui/               # Componentes shadcn/ui
│   ├── game-library.tsx  # Biblioteca de juegos
│   ├── game-card.tsx     # Tarjeta de juego
│   ├── reviews-list.tsx  # Lista de reseñas
│   └── stats-board.tsx   # Dashboard estadísticas
├── backend/              # Backend Express
│   ├── models/          # Modelos Mongoose
│   │   ├── Game.js      # Modelo de Juego
│   │   └── Review.js    # Modelo de Reseña
│   ├── routes/          # Rutas API
│   │   ├── games.js     # CRUD de juegos
│   │   ├── reviews.js   # CRUD de reseñas
│   │   └── stats.js     # Endpoint de estadísticas
│   ├── server.js        # Servidor Express
│   ├── package.json     # Dependencias backend
│   └── .env.example     # Variables de entorno
└── README.md
\`\`\`

## 🔌 API Endpoints

### Juegos

\`\`\`
GET    /api/games          - Obtener todos los juegos
GET    /api/games/:id      - Obtener un juego
POST   /api/games          - Crear nuevo juego
PUT    /api/games/:id      - Actualizar juego
DELETE /api/games/:id      - Eliminar juego
\`\`\`

### Reseñas

\`\`\`
GET    /api/reviews              - Obtener todas las reseñas
GET    /api/reviews/game/:gameId - Obtener reseñas de un juego
POST   /api/reviews              - Crear nueva reseña
PUT    /api/reviews/:id          - Actualizar reseña
DELETE /api/reviews/:id          - Eliminar reseña
\`\`\`

### Estadísticas

\`\`\`
GET    /api/stats          - Obtener estadísticas generales
\`\`\`

## 🎨 Tema Visual

GameTracker utiliza un tema oscuro inspirado en gaming con:
- **Color primario**: Verde neón (#22c55e)
- **Color de acento**: Púrpura (#a855f7)
- **Fondo**: Azul oscuro profundo
- **Tarjetas**: Gris oscuro con bordes sutiles

## 🚀 Próximas Mejoras

- [ ] Sistema de autenticación de usuarios
- [ ] Exportar biblioteca a PDF
- [ ] Modo oscuro/claro
- [ ] Integración con API de juegos (RAWG, IGDB)
- [ ] Sistema de listas personalizadas
- [ ] Compartir biblioteca públicamente
- [ ] Estadísticas avanzadas y gráficos

## 📝 Notas

- Actualmente el frontend usa datos mock en `/app/api/`
- Para conectar al backend real, actualiza las URLs en los componentes
- El backend debe estar corriendo en `http://localhost:5000`

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! Siéntete libre de abrir issues o pull requests.

## 📄 Licencia

MIT License - siéntete libre de usar este proyecto para aprender o construir tu propia versión.
