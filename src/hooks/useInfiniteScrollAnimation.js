import { useEffect, useRef, useState } from 'react';

/**
 * Hook específico para animaciones en scroll infinito
 * Mantiene las animaciones de elementos ya mostrados y solo anima los nuevos
 */
export const useInfiniteScrollAnimation = (items = [], delay = 300) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const [lastItemsLength, setLastItemsLength] = useState(0);
  const observerRef = useRef(null);

  // Efecto para manejar la carga inicial
  useEffect(() => {
    if (items.length > 0 && !hasStarted) {
      setHasStarted(true);
      setLastItemsLength(items.length);
      
      // Animar todos los elementos iniciales
      items.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => new Set([...prev, index]));
        }, index * delay);
      });
    }
  }, [items.length, hasStarted, delay]);

  // Efecto para manejar nuevos elementos (scroll infinito)
  useEffect(() => {
    if (items.length > lastItemsLength && lastItemsLength > 0) {
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
  }, [items.length, lastItemsLength, delay]);

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
