/**
 * CMS de Sanity - Ruta separada
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

// Remove force-static as it can cause issues with Sanity Studio
export const dynamic = 'force-dynamic'

export { metadata, viewport } from 'next-sanity/studio'

export default function CMSPage() {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw', 
      height: '100vh', 
      zIndex: 9999,
      backgroundColor: 'white'
    }}>
      <NextStudio config={config} />
    </div>
  )
}
