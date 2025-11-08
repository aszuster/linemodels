import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Desactivado temporalmente para evitar problemas de caché con imágenes
})

// Función para obtener todos los modelos visibles
export async function getModels() {
  try {
    const models = await client.fetch(`
      *[_type == "model" && (isVisible != false)] | order(name asc) {
        _id,
        name,
        lastName,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos[] {
          asset->{
            _id,
            _ref,
            url
          },
          alt,
          caption
        },
        book[] {
          asset->{
            _id,
            _ref,
            url
          },
          alt,
          orientation
        },
        coverPhoto {
          asset->{
            _id,
            _ref,
            url
          },
          alt
        },
        slug,
        instagram,
        currentLocation,
        isVisible
      }
    `)
    
    console.log('✅ Modelos cargados desde Sanity:', models.length)
    return models
  } catch (error) {
    console.error('❌ Error fetching models:', error)
    return []
  }
}

// Función para obtener un modelo por ID o slug (solo si es visible)
export async function getModelById(id) {
  try {
    const model = await client.fetch(`
      *[_type == "model" && (_id == $id || slug.current == $id) && (isVisible != false)][0] {
        _id,
        name,
        lastName,
        height,
        bust,
        waist,
        hips,
        shoes,
        photos[] {
          asset->{
            _id,
            _ref,
            url
          },
          alt,
          caption
        },
        book[] {
          asset->{
            _id,
            _ref,
            url
          },
          alt,
          orientation
        },
        coverPhoto {
          asset->{
            _id,
            _ref,
            url
          },
          alt
        },
        slug,
        instagram,
        currentLocation,
        isVisible
      }
    `, { id })
    
    if (model) {
      console.log(`✅ Modelo "${model.name}" cargado correctamente`)
    }
    return model
  } catch (error) {
    console.error('❌ Error fetching model:', error)
    return null
  }
}
