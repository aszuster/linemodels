/**
 * Script de diagnóstico para verificar imágenes de Sanity
 * 
 * Ejecuta con: node scripts/check-images.js
 * 
 * Este script te ayudará a identificar qué imágenes tienen problemas
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rua8uh7s',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: process.env.SANITY_API_TOKEN, // Opcional: para acceder a datos privados
})

async function checkImages() {
  console.log('🔍 Iniciando diagnóstico de imágenes...\n')

  try {
    const models = await client.fetch(`
      *[_type == "model"] {
        _id,
        name,
        lastName,
        photos[] {
          asset->{
            _id,
            _ref,
            url
          }
        },
        book[] {
          asset->{
            _id,
            _ref,
            url
          },
          orientation
        },
        coverPhoto {
          asset->{
            _id,
            _ref,
            url
          }
        }
      }
    `)

    console.log(`📊 Total de modelos: ${models.length}\n`)

    let totalIssues = 0

    models.forEach((model, index) => {
      const modelName = `${model.name} ${model.lastName}`
      let hasIssues = false
      let issuesList = []

      // Verificar coverPhoto
      if (!model.coverPhoto) {
        issuesList.push('  ❌ No tiene foto de portada')
        hasIssues = true
      } else if (!model.coverPhoto.asset) {
        issuesList.push('  ❌ Foto de portada sin asset')
        hasIssues = true
      } else if (!model.coverPhoto.asset._ref && !model.coverPhoto.asset._id) {
        issuesList.push('  ❌ Foto de portada con asset sin referencia válida')
        hasIssues = true
      }

      // Verificar photos (polas)
      if (!model.photos || model.photos.length === 0) {
        issuesList.push('  ⚠️  No tiene polas')
      } else {
        const brokenPhotos = model.photos.filter(photo => {
          return !photo || !photo.asset || (!photo.asset._ref && !photo.asset._id)
        })
        
        if (brokenPhotos.length > 0) {
          issuesList.push(`  ❌ ${brokenPhotos.length} pola(s) con referencias rotas de ${model.photos.length} totales`)
          hasIssues = true
        }
      }

      // Verificar book
      if (model.book && model.book.length > 0) {
        const brokenBookImages = model.book.filter(item => {
          return !item || !item.asset || (!item.asset._ref && !item.asset._id)
        })
        
        if (brokenBookImages.length > 0) {
          issuesList.push(`  ❌ ${brokenBookImages.length} imagen(es) de book con referencias rotas de ${model.book.length} totales`)
          hasIssues = true
        }
      }

      if (hasIssues) {
        totalIssues++
        console.log(`\n${index + 1}. 🔴 ${modelName} (ID: ${model._id})`)
        issuesList.forEach(issue => console.log(issue))
      } else {
        console.log(`${index + 1}. ✅ ${modelName} - Todas las imágenes OK`)
      }
    })

    console.log('\n' + '='.repeat(60))
    console.log(`\n📊 RESUMEN:`)
    console.log(`   Total de modelos: ${models.length}`)
    console.log(`   Modelos con problemas: ${totalIssues}`)
    console.log(`   Modelos sin problemas: ${models.length - totalIssues}`)
    
    if (totalIssues > 0) {
      console.log('\n💡 SOLUCIONES:')
      console.log('   1. Ve a Sanity Studio y verifica las imágenes marcadas')
      console.log('   2. Elimina las referencias rotas y sube nuevas imágenes')
      console.log('   3. Asegúrate de que todas las imágenes se carguen correctamente')
      console.log('   4. Vuelve a ejecutar este script para verificar\n')
    } else {
      console.log('\n🎉 ¡Todo está bien! No se encontraron problemas con las imágenes.\n')
    }

  } catch (error) {
    console.error('❌ Error al verificar imágenes:', error)
    
    if (error.message.includes('projectId')) {
      console.log('\n💡 Asegúrate de tener configuradas las variables de entorno:')
      console.log('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
      console.log('   - NEXT_PUBLIC_SANITY_DATASET')
    }
  }
}

// Ejecutar el diagnóstico
checkImages()

