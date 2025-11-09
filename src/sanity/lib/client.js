import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Usar CDN de Sanity para mejor rendimiento (es gratuito e ilimitado)
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

// Función para obtener la galería activa de IA Lab
export async function getIaLabGallery() {
  try {
    const gallery = await client.fetch(`
      *[_type == "iaLab" && isActive == true][0] {
        _id,
        title,
        description,
        images[] {
          asset->{
            _id,
            _ref,
            url
          },
          alt,
          caption
        },
        isActive
      }
    `)
    
    if (gallery) {
      console.log(`✅ Galería IA Lab cargada: ${gallery.images?.length || 0} imágenes`)
    }
    return gallery
  } catch (error) {
    console.error('❌ Error fetching IA Lab gallery:', error)
    return null
  }
}
