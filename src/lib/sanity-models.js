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
        // Si es un objeto de Sanity, convertir a URL sin forzar dimensiones
        return urlFor(image).url()
      } catch (error) {
        console.error('Error processing image:', error)
        return null
      }
    }
    return null
  }).filter(image => image !== null) // Filtrar imágenes nulas
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
        // Usar dimensiones dinámicas basadas en la orientación
        if (item.orientation === 'horizontal') {
          // Para imágenes horizontales, usar dimensiones que mantengan el aspect ratio
          imageUrl = urlFor(item).width(1200).height(800).fit('fill').url()
        } else {
          // Para imágenes verticales, usar dimensiones verticales
          imageUrl = urlFor(item).width(800).height(1200).fit('fill').url()
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
      coverPhoto: model.coverPhoto ? urlFor(model.coverPhoto).url() : null,
      slug: model.slug,
      instagram: model.instagram
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
      coverPhoto: model.coverPhoto ? urlFor(model.coverPhoto).url() : null,
      slug: model.slug,
      contact: model.contact,
      instagram: model.instagram
    }
  } catch (error) {
    console.error('Error fetching model from Sanity:', error)
    return null
  }
}
