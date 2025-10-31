import { createClient } from '@sanity/client'
import 'dotenv/config'

// Configuración del cliente de Sanity
const client = createClient({
  projectId: 'rua8uh7s',
  dataset: 'production',
  useCdn: false, // No usar CDN para escritura
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Necesitarás un token de escritura
})

// Función para agregar el campo isVisible a todos los modelos existentes
async function addVisibilityField() {
  try {
    console.log('🚀 Iniciando actualización de modelos...')
    
    // Obtener todos los modelos que no tienen el campo isVisible
    const models = await client.fetch(`
      *[_type == "model" && !defined(isVisible)] {
        _id,
        name,
        lastName
      }
    `)
    
    if (models.length === 0) {
      console.log('✅ Todos los modelos ya tienen el campo isVisible')
      return
    }
    
    console.log(`📝 Actualizando ${models.length} modelos:`)
    
    // Actualizar cada modelo
    for (const model of models) {
      try {
        await client
          .patch(model._id)
          .set({ isVisible: true })
          .commit()
        
        console.log(`✅ ${model.name} ${model.lastName} - Campo isVisible agregado`)
      } catch (error) {
        console.error(`❌ Error actualizando ${model.name} ${model.lastName}:`, error.message)
      }
    }
    
    console.log('🎉 Actualización completada!')
    console.log('💡 Ahora todos los modelos son visibles por defecto. Puedes ocultarlos desde el CMS.')
    
  } catch (error) {
    console.error('❌ Error en la actualización:', error)
  }
}

// Ejecutar actualización
addVisibilityField()

