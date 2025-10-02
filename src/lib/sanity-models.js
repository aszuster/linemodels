import { getModels, getModelById } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'

// Función para procesar imágenes de Sanity
function processSanityImages(images) {
  if (!images || !Array.isArray(images)) return []
  
  return images.map(image => {
    if (typeof image === 'string') {
      // Si ya es una URL, devolverla tal como está
      return image
    } else if (image && image.asset) {
      // Si es un objeto de Sanity, convertir a URL sin forzar dimensiones
      return urlFor(image).url()
    }
    return image
  })
}

// Función para procesar el book de Sanity
function processSanityBook(book) {
  if (!book || !Array.isArray(book)) return []
  
  return book.map(item => {
    let imageUrl = item.image
    
    if (item.image && item.image.asset) {
      // Usar dimensiones dinámicas basadas en la orientación
      if (item.orientation === 'horizontal') {
        // Para imágenes horizontales, usar dimensiones que mantengan el aspect ratio
        imageUrl = urlFor(item.image).width(1200).height(800).fit('fill').url()
      } else {
        // Para imágenes verticales, usar dimensiones verticales
        imageUrl = urlFor(item.image).width(800).height(1200).fit('fill').url()
      }
    }
    
    return {
      image: imageUrl,
      orientation: item.orientation
    }
  })
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
