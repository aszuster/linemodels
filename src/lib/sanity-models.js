import { getModels, getModelById } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Función para procesar imágenes de Sanity
function processSanityImages(images) {
  if (!images || !Array.isArray(images)) return []
  
  return images.map((image, index) => {
    if (typeof image === 'string' && image.trim() !== '') {
      // Si ya es una URL válida, devolverla tal como está
      return image
    } else if (image && image.asset) {
      // Validar que el asset tenga una referencia válida
      const hasValidRef = image.asset._ref || image.asset._id
      
      if (!hasValidRef) {
        console.warn(`⚠️ Imagen ${index + 1} tiene un asset sin referencia válida:`, image)
        return null
      }
      
      try {
        // Si es un objeto de Sanity, convertir a URL optimizada
        const imageUrl = urlFor(image)
          .width(2400)
          .quality(100)
          .format('webp')
          .auto('format') // Permite que Sanity elija el mejor formato (WebP/AVIF)
          .url()
        
        // Validar que la URL generada es válida
        if (!imageUrl || imageUrl.includes('undefined')) {
          console.warn(`⚠️ URL inválida generada para imagen ${index + 1}:`, imageUrl)
          return null
        }
        
        return imageUrl
      } catch (error) {
        console.error(`❌ Error procesando imagen ${index + 1}:`, error, image)
        return null
      }
    } else {
      if (image) {
        console.warn(`⚠️ Imagen ${index + 1} no tiene estructura válida:`, image)
      }
      return null
    }
  }).filter(image => image !== null) // Filtrar imágenes nulas
    .reverse() // Revertir para mostrar las más nuevas abajo y las más viejas arriba
}

// Función para procesar el book de Sanity
function processSanityBook(book) {
  if (!book || !Array.isArray(book)) return []
  
  return book.map((item, index) => {
    let imageUrl = null
    
    console.log(`📖 Processing book item ${index + 1}:`, item)
    
    // Con la nueva estructura, item es directamente la imagen
    if (item && item.asset) {
      // Validar que el asset tenga una referencia válida
      const hasValidRef = item.asset._ref || item.asset._id
      
      if (!hasValidRef) {
        console.warn(`⚠️ Book imagen ${index + 1} tiene un asset sin referencia válida:`, item)
        return {
          image: null,
          orientation: item.orientation || 'vertical'
        }
      }
      
      try {
        // Usar dimensiones optimizadas basadas en la orientación
        if (item.orientation === 'horizontal') {
          // Para imágenes horizontales (1800x1200 es perfecto para web)
          imageUrl = urlFor(item)
            .width(2400)
            .height(1600)
            .quality(100)
            .format('webp')
            .auto('format')
            .fit('max')
            .url()
        } else {
          // Para imágenes verticales
          imageUrl = urlFor(item)
            .width(1600)
            .height(2400)
            .quality(100)
            .format('webp')
            .auto('format')
            .fit('max')
            .url()
        }
        
        // Validar que la URL generada es válida
        if (!imageUrl || imageUrl.includes('undefined')) {
          console.warn(`⚠️ URL inválida generada para book imagen ${index + 1}:`, imageUrl)
          imageUrl = null
        } else {
          console.log(`✅ Generated image URL for book item ${index + 1}:`, imageUrl)
        }
      } catch (error) {
        console.error(`❌ Error processing book image ${index + 1}:`, error, item)
        imageUrl = null
      }
    } else if (typeof item === 'string' && item.trim() !== '') {
      // Si ya es una URL válida
      imageUrl = item
    } else {
      console.warn(`⚠️ Book item ${index + 1} without valid asset:`, item)
    }
    
    return {
      image: imageUrl,
      orientation: item.orientation || 'vertical'
    }
  }).filter(item => item.image !== null) // Filtrar elementos sin imagen válida
    .reverse() // Revertir para mostrar las más nuevas abajo y las más viejas arriba
}

// Función para obtener todos los modelos con formato compatible
export async function getModelsData() {
  try {
    const models = await getModels()
    
    // Transformar los datos de Sanity al formato esperado por la aplicación
    return models.map((model, index) => ({
      id: model._id,
      name: model.name,
      lastName: model.lastName,
      height: model.height,
      bust: model.bust,
      waist: model.waist,
      hips: model.hips,
      shoes: model.shoes,
      photos: processSanityImages(model.photos),
      book: processSanityBook(model.book),
      coverPhoto: model.coverPhoto ? urlFor(model.coverPhoto).width(1600).quality(100).format('webp').auto('format').url() : null,
      slug: model.slug,
      instagram: model.instagram,
      currentLocation: model.currentLocation
    }))
  } catch (error) {
    console.error('Error fetching models from Sanity:', error)
    return []
  }
}

// Función para obtener un modelo por ID con formato compatible
export async function getModelDataById(id) {
  try {
    const model = await getModelById(id)
    
    if (!model) return null
    
    return {
      id: model._id,
      name: model.name,
      lastName: model.lastName,
      age: model.age,
      height: model.height,
      bust: model.bust,
      waist: model.waist,
      hips: model.hips,
      shoes: model.shoes,
      photos: processSanityImages(model.photos),
      book: processSanityBook(model.book),
      coverPhoto: model.coverPhoto ? urlFor(model.coverPhoto).width(1600).quality(100).format('webp').auto('format').url() : null,
      slug: model.slug,
      contact: model.contact,
      instagram: model.instagram,
      currentLocation: model.currentLocation
    }
  } catch (error) {
    console.error('Error fetching model from Sanity:', error)
    return null
  }
}
