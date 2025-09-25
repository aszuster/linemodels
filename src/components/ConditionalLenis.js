'use client';

import { usePathname } from 'next/navigation';
import { ReactLenis } from '@/utils/lenis';
import { useEffect, useState } from 'react';

export function ConditionalLenis({ children }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Durante SSR, siempre renderizar sin Lenis para evitar problemas
  if (!isClient) {
    return <>{children}</>;
  }
  
  // Desactivar Lenis en la ruta /admin para evitar conflictos con Sanity Studio
  const isAdminRoute = pathname?.startsWith('/admin');
  
  if (isAdminRoute) {
    return <>{children}</>;
  }
  
  return (
    <ReactLenis root>
      {children}
    </ReactLenis>
  );
}
