# LineModels

Sitio web de agencia de modelos construido con Next.js 15 y Sanity CMS.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 15 (App Router)
- **CMS:** Sanity.io
- **Estilos:** Tailwind CSS 4
- **Animaciones:** Lenis (smooth scroll)
- **Imágenes:** Sanity CDN (optimización gratuita ilimitada)
- **Deployment:** Vercel

## 📦 Instalación

```bash
npm install
```

## 🛠️ Scripts Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en [http://localhost:3000](http://localhost:3000)

### Build
```bash
npm run build
```
Construye la aplicación para producción

### Iniciar en Producción
```bash
npm start
```
Inicia el servidor en modo producción

### Diagnóstico de Imágenes
```bash
npm run check-images
```
Ejecuta un diagnóstico completo de todas las imágenes de los modelos para detectar referencias rotas o problemas.

## 🖼️ Optimización de Imágenes

Este proyecto usa el **CDN de Sanity directamente** para evitar los límites del plan gratuito de Vercel (1,000 optimizaciones/mes).

### Ventajas:
- ✅ **Gratuito e ilimitado**
- ✅ **CDN global ultra-rápido**
- ✅ **Optimización automática** (WebP, AVIF)
- ✅ **Sin límites de Vercel**

Para más detalles, ver: [docs/IMAGENES-VERCEL.md](docs/IMAGENES-VERCEL.md)

## 🎨 Estructura del Proyecto

```
linemodels/
├── src/
│   ├── app/              # App Router de Next.js
│   │   ├── page.js       # Página principal (listado de modelos)
│   │   ├── modelo/[id]/  # Páginas de detalle de modelo
│   │   ├── admin/        # Sanity Studio
│   │   └── linemodels/   # Alternativa de admin
│   ├── components/       # Componentes React
│   ├── context/          # Context API (guardados)
│   ├── hooks/            # Custom hooks (animaciones)
│   ├── lib/              # Utilidades y configuración
│   │   ├── sanity-models.js      # Procesamiento de datos de Sanity
│   │   └── sanity-image-loader.js # Custom loader para imágenes
│   └── sanity/           # Configuración de Sanity
│       ├── schemaTypes/  # Schemas de Sanity
│       └── lib/          # Cliente y utilidades de Sanity
├── scripts/              # Scripts de utilidad
│   └── check-images.js   # Diagnóstico de imágenes
├── docs/                 # Documentación
└── public/               # Assets estáticos
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env.local` con:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=tu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-05-03
```

### Sanity Studio

Accede al CMS en:
- Local: [http://localhost:3000/admin](http://localhost:3000/admin)
- Producción: `https://tu-dominio.com/admin`

## 🐛 Solución de Problemas

### Error 402: PAYMENT_REQUIRED (Imágenes)
Este proyecto ya está configurado para evitar este error usando el CDN de Sanity. Si lo ves, verifica que:
1. El archivo `next.config.mjs` tenga el custom loader configurado
2. El archivo `src/lib/sanity-image-loader.js` exista

### Imágenes no se muestran
1. Ejecuta `npm run check-images` para diagnosticar
2. Verifica las referencias en Sanity Studio
3. Revisa la consola del navegador para mensajes de error

## 📝 Características

- ✅ Listado de modelos con grid responsive
- ✅ Páginas de detalle con galería de fotos (polas)
- ✅ Book de cada modelo
- ✅ Sistema de guardados (favoritos)
- ✅ Smooth scroll con Lenis
- ✅ Animaciones al scroll
- ✅ Responsive (mobile y desktop)
- ✅ Sanity CMS integrado
- ✅ Optimización de imágenes ilimitada

## 🚢 Deploy en Vercel

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

⚠️ **Importante:** Este proyecto usa el CDN de Sanity para imágenes, por lo que no tendrás problemas con el límite de optimización de imágenes del plan gratuito de Vercel.

## 📚 Documentación Adicional

- [Optimización de Imágenes](docs/IMAGENES-VERCEL.md)
- [Next.js Docs](https://nextjs.org/docs)
- [Sanity Docs](https://www.sanity.io/docs)
