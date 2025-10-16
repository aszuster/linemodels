import { useEffect, useRef, useCallback } from 'react';

/**
 * Hook para animar elementos cuando entran en el viewport
 * Los elementos iniciales se animan en secuencia completa
 * Los elementos del scroll se animan con stagger por fila
 * Optimizado para no causar re-renders - manipula DOM directamente
 */
export const useScrollAnimation = (isMobile = false) => {
  const observersRef = useRef(new Map());
  const hasAnimatedInitial = useRef(false);
  const timeoutsRef = useRef([]);
  const columnsPerRow = isMobile ? 2 : 3;
  const initialVisibleCount = isMobile ? 6 : 6; // Primeros elementos visibles

  // Función para observar un elemento (memoizada)
  const observeElement = useCallback((element, index) => {
    if (!element || observersRef.current.has(index)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Para los primeros elementos (carga inicial), animar en secuencia completa
          if (index < initialVisibleCount && !hasAnimatedInitial.current) {
            const delay = index * 150; // 150ms entre cada elemento consecutivo
            const timeout = setTimeout(() => {
              // Manipular DOM directamente - no causa re-render
              entry.target.classList.add('visible');
            }, delay);
            timeoutsRef.current.push(timeout);
          } else {
            // Para elementos del scroll, animar por fila (stagger por columna)
            const columnIndex = index % columnsPerRow;
            const delay = columnIndex * 150;
            
            const timeout = setTimeout(() => {
              // Manipular DOM directamente - no causa re-render
              entry.target.classList.add('visible');
            }, delay);
            timeoutsRef.current.push(timeout);
          }
          
          // Una vez visible, dejar de observar
          observer.disconnect();
          observersRef.current.delete(index);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    observer.observe(element);
    observersRef.current.set(index, observer);
  }, [isMobile, columnsPerRow, initialVisibleCount]);
  
  // Marcar que ya se animaron los iniciales después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      hasAnimatedInitial.current = true;
    }, initialVisibleCount * 150 + 500);
    
    return () => clearTimeout(timer);
  }, [initialVisibleCount]);

  // Cleanup
  useEffect(() => {
    return () => {
      // Limpiar observers
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
      
      // Limpiar timeouts
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
    };
  }, []);

  // Resetear visibleItems cuando cambia de página en móvil
  const resetVisibility = useCallback((containerElement) => {
    if (isMobile && containerElement) {
      observersRef.current.forEach(observer => observer.disconnect());
      observersRef.current.clear();
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout));
      timeoutsRef.current = [];
      
      // Remover clase 'visible' de todos los elementos
      const elements = containerElement.querySelectorAll('.fade-in-stagger');
      elements.forEach(el => el.classList.remove('visible'));
    }
  }, [isMobile]);

  return { observeElement, resetVisibility };
};

