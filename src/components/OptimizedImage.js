import Image from 'next/image'
import { urlForOptimized, urlForPlaceholder } from '../sanity/lib/image'

/**
 * Componente optimizado para mostrar imágenes de Sanity
 * Incluye lazy loading, placeholders y optimización automática
 */
export default function OptimizedImage({ 
  image, 
  alt = '', 
  width = 800, 
  height, 
  quality = 80,
  priority = false,
  className = '',
  ...props 
}) {
  if (!image) return null

  // Generar URLs optimizadas
  const optimizedSrc = urlForOptimized(image, {
    width,
    height,
    quality,
    format: 'auto' // Conversión automática a WebP/AVIF
  }).url()

  // Placeholder de baja calidad para LQIP
  const placeholderSrc = urlForPlaceholder(image).url()

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={optimizedSrc}
        alt={alt || image.alt || ''}
        width={width}
        height={height}
        quality={quality}
        priority={priority}
        placeholder="blur"
        blurDataURL={placeholderSrc}
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="transition-opacity duration-300"
        onLoad={(e) => {
          e.target.style.opacity = '1'
        }}
        style={{ opacity: 0 }}
        {...props}
      />
    </div>
  )
}

/**
 * Componente para galería de imágenes con lazy loading
 */
export function ImageGallery({ images, className = '' }) {
  if (!images || images.length === 0) return null

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <OptimizedImage
          key={image._key || index}
          image={image}
          alt={image.alt || ''}
          width={400}
          height={600}
          quality={85}
          className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        />
      ))}
    </div>
  )
}

/**
 * Componente específico para Book (Portfolio)
 * Maneja tanto imágenes directas como objetos con orientación
 */
export function BookGallery({ bookItems, className = '' }) {
  if (!bookItems || bookItems.length === 0) return null

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
      {bookItems.map((item, index) => {
        // Determinar si es imagen directa o objeto con imagen
        const imageData = item.asset ? item : item.image
        const orientation = item.orientation || 'vertical' // Por defecto vertical
        const alt = imageData.alt || ''
        
        // Calcular dimensiones basadas en orientación
        const width = orientation === 'vertical' ? 400 : 600
        const height = orientation === 'vertical' ? 600 : 400
        const aspectClass = orientation === 'vertical' ? 'aspect-[2/3]' : 'aspect-[3/2]'

        return (
          <div key={item._key || index} className={`${aspectClass} overflow-hidden rounded-lg`}>
            <OptimizedImage
              image={imageData}
              alt={alt}
              width={width}
              height={height}
              quality={85}
              className="w-full h-full object-cover shadow-md hover:shadow-lg transition-shadow duration-300"
            />
          </div>
        )
      })}
    </div>
  )
}

/**
 * Hook para precargar imágenes importantes
 */
export function useImagePreload(images) {
  React.useEffect(() => {
    if (!images || images.length === 0) return

    // Precargar las primeras 3 imágenes
    const imagesToPreload = images.slice(0, 3)
    
    imagesToPreload.forEach(image => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = urlForOptimized(image, { width: 800, quality: 80 }).url()
      document.head.appendChild(link)
    })
  }, [images])
}
