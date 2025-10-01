# Sentify

SentiFy es una aplicación innovadora que permite a los usuarios conectar de manera sencilla su cuenta personal de Spotify y, a partir de allí, analizar de forma automática las canciones que han guardado o marcado con “me gusta”. El sistema examina las playlists existentes utilizando las características de audio que proporciona la propia API de Spotify, tales como la energía, la valencia (nivel de positividad emocional), el tempo y otros atributos musicales. Con base en esta información, la aplicación reorganiza y clasifica las canciones en listas de reproducción nuevas que se construyen de acuerdo con el estado de ánimo predominante que transmiten. De este modo, los usuarios no solo tienen un acceso más ordenado a su música, sino que también pueden disfrutar de una experiencia personalizada que se adapta a cómo se sienten en cada momento, facilitando la creación de ambientes musicales para estudiar, entrenar, relajarse o divertirse.

## Tecnologías

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Flowbite
- **Backend**: Next.js API Routes
- **Base de Datos**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Autenticación**: OAuth 2.0 con Spotify
- **Estado**: Zustand
- **Testing**: Jest + React Testing Library

## Configuración Inicial

### 1. Clona el repositorio

```bash
git clone <repo-url>
cd sentify
```

### 2. Instala dependencias

```bash
npm install
```

### 3. Configura variables de entorno

Crea un archivo `.env` en la raíz con:

```env
DATABASE_URL="postgresql://usuario:password@host:puerto/db?schema=public"
SPOTIFY_CLIENT_ID="tu_client_id_de_spotify"
SPOTIFY_CLIENT_SECRET="tu_client_secret_de_spotify"
NEXTAUTH_SECRET="cadena_aleatoria_segura"
NEXTAUTH_URL="http://127.0.0.1:3000"
```

### 5. Configura Base de Datos

Dado que la base de datos se encuentra en Supabase, no es necesario generar migraciones locales con el comando npx prisma migrate. Puede pasarse directamente a la generación del cliente de Prisma:

```bash
npx prisma generate
```

### 6. Corre el proyecto

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## Comandos Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linting con ESLint
- `npm test` - Ejecutar tests
- `npm run test:coverage` - Tests con cobertura
- `npx prisma studio` - Explorar DB localmente

## Estructura del Proyecto

```
sentify/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   ├── globals.css     # Estilos globales
│   ├── layout.js       # Layout principal
│   └── page.js         # Página de inicio
├── lib/                # Utilidades
├── prisma/             # Schema de DB
├── public/             # Assets estáticos
└── tests/              # Tests (futuro)
```

## Desarrollo

- Usa `npm run dev` para desarrollo con Turbopack
- Tests con `npm test` (cobertura objetivo: 90%)
- Linting automático con ESLint

## Despliegue

- Recomendado: Vercel (integración con Next.js)
- DB: Supabase (instancia administrada de PostgreSQL)
