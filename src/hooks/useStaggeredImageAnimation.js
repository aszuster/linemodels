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
  const [isClient, setIsClient] = useState(false);
  const observerRef = useRef(null);

  // Asegurar que estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Inicializar todas las imágenes como visibles después de un breve delay
  useEffect(() => {
    if (!isClient || items.length === 0) return;

    // Mostrar todas las imágenes inmediatamente en producción para evitar problemas
    const timer = setTimeout(() => {
      const allIndices = new Set(items.map((_, index) => index));
      setVisibleItems(allIndices);
    }, 100);

    return () => clearTimeout(timer);
  }, [items.length, isClient]);

  // Función para registrar un elemento para observación (simplificada)
  const registerElement = (index, element) => {
    // No hacer nada, las imágenes se muestran automáticamente
    return;
  };

  return { visibleItems, registerElement };
};
