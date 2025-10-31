import { getModels, getModelById } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Función para procesar imágenes de Sanity
function processSanityImages(images) {
  if (!images || !Array.isArray(images)) return []
  
  return images.map(image => {
    if (typeof image === 'string' && image.trim() !== '') {
      // Si ya es una URL válida, devolverla tal como está
      return image
    } else if (image && image.asset) {
      try {
        // Si es un objeto de Sanity, convertir a URL optimizada
        // 1800px es suficiente para pantallas 4K, quality 85 es imperceptible vs 100
        return urlFor(image)
          .width(2400)
          .quality(100)
          .format('webp')
          .auto('format') // Permite que Sanity elija el mejor formato (WebP/AVIF)
          .url()
      } catch (error) {
        console.error('Error processing image:', error)
        return null
      }
    }
    return null
  }).filter(image => image !== null) // Filtrar imágenes nulas
    .reverse() // Revertir para mostrar las más nuevas abajo y las más viejas arriba
}

// Función para procesar el book de Sanity
function processSanityBook(book) {
  if (!book || !Array.isArray(book)) return []
  
  return book.map(item => {
    let imageUrl = null
    
    console.log('Processing book item:', item)
    
    // Con la nueva estructura, item es directamente la imagen
    if (item && item.asset) {
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
        console.log('Generated image URL:', imageUrl)
      } catch (error) {
        console.error('Error processing book image:', error)
        imageUrl = null
      }
    } else if (typeof item === 'string' && item.trim() !== '') {
      // Si ya es una URL válida
      imageUrl = item
    } else {
      console.log('Book item without valid asset:', item)
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
