export const modelSchema = {
  name: 'model',
  title: 'Modelo',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    },
    {
      name: 'lastName',
      title: 'Apellido',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(50)
    },
    {
      name: 'age',
      title: 'Edad',
      type: 'number',
      validation: Rule => Rule.required().min(16).max(50)
    },
    {
      name: 'height',
      title: 'Altura',
      type: 'string',
      placeholder: 'ej: 179cm'
    },
    {
      name: 'bust',
      title: 'Busto',
      type: 'string',
      placeholder: 'ej: 80cm'
    },
    {
      name: 'waist',
      title: 'Cintura',
      type: 'string',
      placeholder: 'ej: 62cm'
    },
    {
      name: 'hips',
      title: 'Cadera',
      type: 'string',
      placeholder: 'ej: 87cm'
    },
    {
      name: 'shoes',
      title: 'Calzado',
      type: 'string',
      placeholder: 'ej: 40'
    },
    {
      name: 'photos',
      title: 'Fotos',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true
          },
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
              description: 'Descripción de la imagen para accesibilidad'
            }
          ]
        }
      ],
      validation: Rule => Rule.min(1).max(10)
    },
    {
      name: 'book',
      title: 'Book',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Imagen',
              type: 'image',
              options: {
                hotspot: true
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texto alternativo',
                  type: 'string'
                }
              ]
            },
            {
              name: 'orientation',
              title: 'Orientación',
              type: 'string',
              options: {
                list: [
                  { title: 'Vertical', value: 'vertical' },
                  { title: 'Horizontal', value: 'horizontal' }
                ],
                layout: 'radio'
              },
              validation: Rule => Rule.required()
            }
          ],
          preview: {
            select: {
              media: 'image',
              title: 'orientation'
            },
            prepare(selection) {
              const { media, title } = selection
              return {
                title: `Orientación: ${title}`,
                media: media
              }
            }
          }
        }
      ]
    },
    {
      name: 'contact',
      title: 'Contacto',
      type: 'email',
      validation: Rule => Rule.required().email()
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'lastName',
      media: 'photos.0'
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title: `${title} ${subtitle}`,
        subtitle: `Modelo`,
        media: media
      }
    }
  }
}
