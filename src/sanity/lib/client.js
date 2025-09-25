import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Función para obtener todos los modelos
export async function getModels() {
  try {
    const models = await client.fetch(`
      *[_type == "model"] | order(name asc) {
        _id,
        name,
        lastName,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos,
        book,
        coverPhoto,
        slug,
        instagram
      }
    `)
    return models
  } catch (error) {
    console.error('Error fetching models:', error)
    return []
  }
}

// Función para obtener un modelo por ID
export async function getModelById(id) {
  try {
    const model = await client.fetch(`
      *[_type == "model" && _id == $id][0] {
        _id,
        name,
        lastName,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos,
        book,
        coverPhoto,
        slug,
        instagram
      }
    `, { id })
    return model
  } catch (error) {
    console.error('Error fetching model:', error)
    return null
  }
}
