# 🖼️ Optimización de Imágenes con Sanity CDN

## El Problema

Vercel tiene un límite en el plan gratuito para la optimización de imágenes de Next.js:
- **1,000 optimizaciones por mes** en el plan gratuito
- Después de ese límite, obtienes el error: `402: PAYMENT_REQUIRED`

## La Solución

En lugar de usar el Image Optimization de Vercel, usamos **el CDN de Sanity directamente**, que es:
- ✅ **Gratuito e ilimitado**
- ✅ **Muy rápido** (CDN global)
- ✅ **Optimización automática** (WebP, AVIF, etc.)
- ✅ **Redimensionamiento on-the-fly**

## Cómo Funciona

### 1. Custom Image Loader (`src/lib/sanity-image-loader.js`)

Este loader intercepta todas las peticiones de imágenes de Next.js y las redirige al CDN de Sanity:

```javascript
// En lugar de pasar por Vercel:
https://tu-dominio.vercel.app/_next/image?url=...&w=800&q=75

// Va directo a Sanity CDN:
https://cdn.sanity.io/images/.../image.jpg?w=800&q=75&auto=format&fit=max
```

### 2. Configuración en `next.config.mjs`

```javascript
images: {
  loader: 'custom',
  loaderFile: './src/lib/sanity-image-loader.js',
  // ...
}
```

### 3. URLs Optimizadas en `src/lib/sanity-models.js`

Las funciones `processSanityImages()` y `processSanityBook()` ya generan URLs optimizadas de Sanity con:
- **Dimensiones apropiadas** (2400px max para alta calidad)
- **Calidad 100** (Sanity comprime eficientemente)
- **Formato WebP** (con fallback automático)
- **Auto-format** (WebP/AVIF según soporte del navegador)

## Parámetros de Optimización de Sanity

El CDN de Sanity soporta muchos parámetros de optimización:

- `w=800` - Ancho en píxeles
- `h=600` - Alto en píxeles
- `q=85` - Calidad (0-100)
- `auto=format` - Formato automático (WebP/AVIF)
- `fit=max` - Mantener aspect ratio
- `fit=crop` - Recortar al tamaño exacto
- `crop=center` - Punto de recorte
- `blur=50` - Blur (para placeholders)
- `fm=webp` - Forzar formato específico

Documentación completa: https://www.sanity.io/docs/image-urls

## Beneficios

1. **Sin límites de Vercel** - Puedes optimizar infinitas imágenes
2. **Mejor rendimiento** - CDN global de Sanity
3. **Cero costo adicional** - Todo incluido en Sanity gratuito
4. **Optimización automática** - Sanity elige el mejor formato
5. **Cache inteligente** - Imágenes cacheadas globalmente

## Monitoreo

Para verificar que todo funciona correctamente:

1. Abre las DevTools del navegador
2. Ve a la pestaña "Network"
3. Filtra por "Img"
4. Verifica que las URLs sean `cdn.sanity.io` y no `_next/image`

## Plan de Respaldo

Si en algún momento necesitas volver a usar la optimización de Vercel:

1. Comenta estas líneas en `next.config.mjs`:
```javascript
// loader: 'custom',
// loaderFile: './src/lib/sanity-image-loader.js',
```

2. Reinicia el servidor de desarrollo

⚠️ **Nota:** Solo hazlo si subes a un plan pago de Vercel.

## Límites de Sanity

Sanity también tiene límites en el plan gratuito, pero son mucho más generosos:
- **200,000 assets** (imágenes/documentos)
- **10 GB de ancho de banda** por mes
- **Unlimited CDN requests**

Para un sitio de modelos, estos límites son más que suficientes.

