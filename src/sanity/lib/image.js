import createImageUrlBuilder from '@sanity/image-url'

import { dataset, projectId } from '../env'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset })

export const urlFor = (source) => {
  return builder.image(source)
}

// Función optimizada para diferentes tamaños y formatos
export const urlForOptimized = (source, options = {}) => {
  const {
    width = 800,
    height,
    quality = 80,
    format = 'auto', // auto, webp, avif, jpg, png
    fit = 'crop',
    crop = 'center'
  } = options

  return builder
    .image(source)
    .width(width)
    .height(height)
    .quality(quality)
    .format(format)
    .fit(fit)
    .crop(crop)
    .auto('format') // Conversión automática al mejor formato
}

// Función para generar placeholders de baja calidad (LQIP)
export const urlForPlaceholder = (source) => {
  return builder
    .image(source)
    .width(20)
    .quality(20)
    .blur(50)
}
