/**
 * Custom Image Loader para Next.js
 * 
 * Este loader usa el CDN de Sanity directamente en lugar del 
 * Image Optimization de Vercel, evitando los límites del plan gratuito.
 * 
 * Sanity ya optimiza las imágenes automáticamente y tiene CDN gratuito ilimitado.
 */

export default function sanityImageLoader({ src, width, quality }) {
  // Si la URL ya es de Sanity CDN, añadirle parámetros de optimización
  if (src.includes('cdn.sanity.io')) {
    const url = new URL(src)
    
    // Añadir parámetros de optimización de Sanity
    if (width) {
      url.searchParams.set('w', width.toString())
    }
    
    if (quality) {
      url.searchParams.set('q', quality.toString())
    }
    
    // Formato automático (WebP/AVIF según soporte del navegador)
    url.searchParams.set('auto', 'format')
    
    // Fit para mantener aspect ratio
    url.searchParams.set('fit', 'max')
    
    return url.toString()
  }
  
  // Si no es una URL de Sanity, devolverla tal cual
  return src
}

