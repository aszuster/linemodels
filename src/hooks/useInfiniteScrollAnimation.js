import { useEffect, useRef, useState } from 'react';

/**
 * Hook específico para animaciones en scroll infinito
 * Mantiene las animaciones de elementos ya mostrados y solo anima los nuevos
 * En móvil, reinicia la animación en cada cambio de página
 */
export const useInfiniteScrollAnimation = (items = [], delay = 300, isMobile = false) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const [lastItemsLength, setLastItemsLength] = useState(0);
  const observerRef = useRef(null);
  const previousItemsRef = useRef([]);

  // Efecto para manejar la carga inicial y cambios de página en móvil
  useEffect(() => {
    if (items.length > 0) {
      // Comparar items para detectar cambios reales
      const hasChanged = items.length !== previousItemsRef.current.length || 
        (items.length > 0 && previousItemsRef.current.length > 0 && 
         items[0]?.id !== previousItemsRef.current[0]?.id);
      
      if (hasChanged) {
        previousItemsRef.current = items;
        
        // En móvil, reiniciar animación en cada cambio de página
        if (isMobile) {
          setVisibleItems(new Set());
          setHasStarted(false);
          setLastItemsLength(0);
          
          // Animar todos los elementos de la página actual
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
          });
          setHasStarted(true);
        } else if (!hasStarted) {
          // Desktop: comportamiento original
          setHasStarted(true);
          setLastItemsLength(items.length);
          
          // Animar todos los elementos iniciales
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
          });
        }
      }
    }
  }, [items, hasStarted, delay, isMobile]);

  // Efecto para manejar nuevos elementos (scroll infinito) - Solo en desktop
  useEffect(() => {
    if (!isMobile && items.length > lastItemsLength && lastItemsLength > 0) {
      const newItemsCount = items.length - lastItemsLength;
      const startIndex = lastItemsLength;
      
      // Animar solo los elementos nuevos
      for (let i = 0; i < newItemsCount; i++) {
        const index = startIndex + i;
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, i * delay);
      }
      
      setLastItemsLength(items.length);
    }
  }, [items.length, lastItemsLength, delay, isMobile]);

  // Intersection Observer para detectar cuando el contenedor entra en viewport
  useEffect(() => {
    if (!containerRef.current || hasStarted) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setLastItemsLength(items.length);
          
          // Animar todos los elementos
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items.length, delay, hasStarted]);

  return { containerRef, visibleItems, hasStarted };
};
