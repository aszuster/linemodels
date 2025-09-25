import { createClient } from '@sanity/client'
import { modelsData } from '../src/data/models.js'

// Configuración del cliente de Sanity
const client = createClient({
  projectId: 'rua8uh7s',
  dataset: 'production',
  useCdn: false, // No usar CDN para escritura
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Necesitarás un token de escritura
})

// Función para migrar los primeros 6 modelos
async function migrateModels() {
  try {
    console.log('🚀 Iniciando migración de modelos...')
    
    // Tomar solo los primeros 6 modelos
    const modelsToMigrate = modelsData.slice(0, 6)
    
    console.log(`📝 Migrando ${modelsToMigrate.length} modelos:`)
    modelsToMigrate.forEach((model, index) => {
      console.log(`${index + 1}. ${model.name} ${model.lastName}`)
    })
    
    // Migrar cada modelo
    for (const model of modelsToMigrate) {
      try {
        const doc = {
          _type: 'model',
          name: model.name,
          lastName: model.lastName,
          age: model.age,
          height: model.height,
          bust: model.bust,
          waist: model.waist,
          hips: model.hips,
          shoes: model.shoes,
          contact: model.contact,
          // Por ahora, las fotos y book se pueden agregar manualmente en el CMS
          // ya que requieren subir imágenes reales
          photos: [],
          book: []
        }
        
        const result = await client.create(doc)
        console.log(`✅ Modelo ${model.name} ${model.lastName} migrado con ID: ${result._id}`)
      } catch (error) {
        console.error(`❌ Error migrando ${model.name} ${model.lastName}:`, error.message)
      }
    }
    
    console.log('🎉 Migración completada!')
    console.log('💡 Ahora puedes ir a http://localhost:3000/linemodels para ver el CMS')
    
  } catch (error) {
    console.error('❌ Error en la migración:', error)
  }
}

// Ejecutar migración
migrateModels()
