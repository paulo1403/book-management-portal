# Portal de Gestión de Libros

Aplicación web desarrollada con React + TypeScript + Vite para la gestión de libros.

## Instalación y Configuración

1. Clonar el repositorio:
```bash
git clone <url-del-repositorio>
cd book-management-portal
```

2. Instalar dependencias:
```bash
npm install
# o
yarn install
```

3. Configurar variables de entorno:
   - Crear un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=tu_url_api_aquí || http://localhost:8000/api
```

## Desarrollo Local

Para iniciar el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
```

## Estructura del Proyecto

```
book-management-portal/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── pages/         # Páginas de la aplicación 
│   ├── services/      # Servicios y APIs
│   └── stores/        # Estados globales (Zustand)
├── public/           # Archivos estáticos
└── ...
```