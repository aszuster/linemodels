import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuración del cliente de Sanity
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rua8uh7s',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Usar CDN para mejor rendimiento
  apiVersion: '2023-05-03', // Usar una versión estable de la API
})

// Configuración para URLs de imágenes
const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

// Query para obtener todos los modelos
export async function getModels() {
  try {
    const models = await client.fetch(`
      *[_type == "model"] | order(name asc) {
        _id,
        name,
        lastName,
        age,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos,
        book,
        contact
      }
    `)
    return models
  } catch (error) {
    console.error('Error fetching models:', error)
    return []
  }
}

// Query para obtener un modelo por ID
export async function getModelById(id) {
  try {
    const model = await client.fetch(`
      *[_type == "model" && _id == $id][0] {
        _id,
        name,
        lastName,
        age,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos,
        book,
        contact
      }
    `, { id })
    return model
  } catch (error) {
    console.error('Error fetching model:', error)
    return null
  }
}
