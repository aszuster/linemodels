# Instrucciones para gestionar imágenes de IA Lab desde Sanity CMS

## 📋 Resumen
Ahora las imágenes del carrusel de la página IA Lab se gestionan completamente desde Sanity CMS. Puedes agregar, editar, reordenar y eliminar imágenes sin tocar el código.

## 🚀 Cómo acceder al CMS

1. Ve a la URL de administración de tu sitio:
   - **Local**: `http://localhost:3000/admin`
   - **Producción**: `https://tudominio.com/admin`

2. Inicia sesión con tus credenciales de Sanity

## 📸 Cómo agregar/editar imágenes de IA Lab

### Primera vez - Crear la galería

1. En el panel de Sanity, busca **"IA Lab"** en el menú lateral
2. Haz clic en **"Create New IA Lab"** (o el botón +)
3. Rellena los campos:
   - **Título**: Un nombre interno para identificar esta galería (ej: "Galería IA Lab 2024")
   - **Descripción**: Notas internas (opcional, no se muestra en el sitio)
   - **Imágenes del Carrusel**: Aquí subes las imágenes
   - **Galería Activa**: Asegúrate de marcar esta casilla como ✓ (activa)

4. Para agregar imágenes:
   - Haz clic en **"Add item"** en la sección "Imágenes del Carrusel"
   - Sube la imagen desde tu computadora
   - Opcionalmente, agrega un texto alternativo (para accesibilidad)
   - Repite para cada imagen

5. Haz clic en **"Publish"** para guardar los cambios

### Editar imágenes existentes

1. Ve a **"IA Lab"** en el panel de Sanity
2. Selecciona la galería que quieres editar
3. Puedes:
   - **Agregar más imágenes**: Clic en "Add item"
   - **Reordenar**: Arrastra las imágenes para cambiar el orden
   - **Eliminar**: Haz clic en el menú ⋮ de cada imagen → "Remove"
   - **Reemplazar**: Elimina la imagen antigua y agrega una nueva

4. Haz clic en **"Publish"** para guardar

## ⚙️ Configuraciones importantes

### Solo una galería activa
- Solo puede haber **una galería activa** a la vez
- Si activas una nueva galería, las demás se desactivarán automáticamente
- El sitio web siempre mostrará la galería marcada como "activa"

### Orden de las imágenes
- Las imágenes se muestran en el orden en que las subiste o reordenaste
- Puedes arrastrar y soltar para cambiar el orden en cualquier momento

### Formatos recomendados
- **Formato**: JPG, PNG o WebP
- **Orientación**: Horizontal (paisaje) o vertical, cualquiera funciona
- **Proporción**: Cualquier proporción - las imágenes se mostrarán completas sin recortes
- **Resolución**: Mínimo 1920px de ancho para calidad óptima
- **Nota**: Las imágenes se mostrarán completas adaptándose a su tamaño natural

## 🔧 Archivos técnicos creados

Para referencia de los desarrolladores:

1. **Schema de Sanity**: `src/sanity/schemaTypes/iaLab.js`
2. **Consultas a la API**: `src/sanity/lib/client.js` (función `getIaLabGallery`)
3. **Procesamiento de datos**: `src/lib/sanity-models.js` (función `getIaLabImages`)
4. **Página frontend**: `src/app/ia-lab/page.js`

## 🐛 Solución de problemas

### Las imágenes no aparecen en el sitio
1. Verifica que la galería esté marcada como **"Galería Activa"** (✓)
2. Asegúrate de haber hecho clic en **"Publish"**
3. Limpia el caché del navegador (Ctrl+F5 o Cmd+Shift+R)

### Error al subir imágenes
- Verifica que el archivo sea una imagen válida (JPG, PNG, WebP)
- Asegúrate de tener permisos de escritura en Sanity
- Si el archivo es muy grande (>10MB), intenta reducir el tamaño

### Las imágenes están en orden incorrecto
- Arrastra y suelta las imágenes en el orden deseado dentro de Sanity
- Haz clic en "Publish" para guardar el nuevo orden

## 📝 Notas adicionales

- Los cambios se reflejan inmediatamente después de publicar
- Las imágenes se optimizan automáticamente para web (formato WebP)
- El carrusel tiene navegación con flechas y teclado
- En desktop, hacer clic en una imagen la abre en modal pantalla completa
- La navegación funciona con:
  - Botones anterior/siguiente
  - Flechas del teclado (← →)
  - En el modal: hacer clic en los lados izquierdo/derecho de la imagen
  - Tecla ESC para cerrar el modal

