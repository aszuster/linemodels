export default {
  name: 'iaLab',
  title: 'IA Lab',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'Título interno para identificar este conjunto de imágenes',
      initialValue: 'Galería IA Lab',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      description: 'Descripción interna (no se muestra en el sitio)',
      rows: 3
    },
    {
      name: 'images',
      title: 'Imágenes del Carrusel',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
            storeOriginalFilename: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Descripción de la imagen para accesibilidad'
            },
            {
              name: 'caption',
              title: 'Descripción',
              type: 'string',
              description: 'Descripción opcional de la imagen'
            }
          ]
        }
      ],
      description: 'Imágenes que aparecerán en el carrusel de IA Lab. Las imágenes se mostrarán completas sin recortes, adaptándose a su tamaño natural.',
      options: {
        sortable: true,
        layout: 'grid'
      }
    },
    {
      name: 'isActive',
      title: 'Galería Activa',
      type: 'boolean',
      description: 'Solo una galería puede estar activa. Si activas esta, las demás se desactivarán automáticamente.',
      initialValue: true,
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      isActive: 'isActive',
      imageCount: 'images'
    },
    prepare(selection) {
      const { title, media, isActive, imageCount } = selection
      const count = imageCount?.length || 0
      return {
        title: `${title}${isActive ? ' ✓' : ' (Inactiva)'}`,
        subtitle: `${count} imagen${count !== 1 ? 'es' : ''} - ${isActive ? 'Galería Activa' : 'Inactiva'}`,
        media: media
      }
    }
  }
}

