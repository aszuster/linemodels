import { useEffect, useRef, useState } from 'react';

/**
 * Hook para animación escalonada de imágenes
 * Aplica el efecto de aparición secuencial a un array de elementos
 */
export const useStaggeredImageAnimation = (items = [], delay = 200) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const observerRef = useRef(null);

  // Efecto para iniciar la animación cuando el contenedor entra en viewport
  useEffect(() => {
    if (!containerRef.current || hasStarted || items.length === 0) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Animar todos los elementos con delay escalonado
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
          });
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observerRef.current.observe(containerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [items.length, delay, hasStarted]);

  // Reset cuando cambian los items (útil para cuando cambia la foto seleccionada)
  useEffect(() => {
    if (items.length > 0 && hasStarted) {
      setVisibleItems(new Set());
      setHasStarted(false);
    }
  }, [items.length]);

  return { containerRef, visibleItems, hasStarted };
};

/**
 * Hook para animación progresiva de imágenes con scroll
 * Cada imagen aparece individualmente cuando entra en viewport
 */
export const useProgressiveImageAnimation = (items = [], delay = 200) => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const observerRefs = useRef([]);
  const [isClient, setIsClient] = useState(false);

  // Asegurar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || items.length === 0) return;

    // Crear observers para cada elemento
    const observers = items.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Aparecer con delay escalonado
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
            
            // Desconectar el observer para esta imagen
            observer.disconnect();
          }
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px', // Reducido para mejor detección
        }
      );
      
      return observer;
    });

    observerRefs.current = observers;

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [items.length, delay, isClient]);

  // Función para registrar un elemento para observación
  const registerElement = (index, element) => {
    if (element && observerRefs.current[index] && isClient) {
      observerRefs.current[index].observe(element);
    }
  };

  return { visibleItems, registerElement };
};
