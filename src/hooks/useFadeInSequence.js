import { useEffect, useRef, useState } from 'react';

/**
 * Hook personalizado para manejar animaciones de fade in en secuencia
 * @param {number} delay - Delay entre cada elemento (en ms)
 * @param {number} threshold - Threshold para Intersection Observer (0-1)
 * @returns {Object} - { ref, isVisible, hasAnimated }
 */
export const useFadeInSequence = (delay = 500, threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Aplicar delay basado en el índice del elemento
          const element = entry.target;
          const index = Array.from(element.parentNode?.children || []).indexOf(element);
          const totalDelay = index * delay;

          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, totalDelay);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Empezar animación un poco antes de que sea completamente visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold, hasAnimated]);

  return { ref, isVisible, hasAnimated };
};

/**
 * Hook para manejar animaciones de fade in en secuencia con control de grupo
 * Útil cuando quieres que todas las animaciones se ejecuten en secuencia
 * @param {Array} items - Array de items a animar
 * @param {number} delay - Delay entre cada elemento (en ms)
 * @param {number} threshold - Threshold para Intersection Observer (0-1)
 * @returns {Array} - Array de objetos con { ref, isVisible, hasAnimated }
 */
export const useFadeInSequenceGroup = (items = [], delay = 500, threshold = 0.1) => {
  const containerRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [hasStarted, setHasStarted] = useState(false);
  const [lastItemsLength, setLastItemsLength] = useState(0);
  const [lastAnimatedIndex, setLastAnimatedIndex] = useState(-1);

  // Manejar nuevos elementos en scroll infinito
  useEffect(() => {
    if (items.length > lastItemsLength && lastItemsLength > 0) {
      // Solo animar los elementos nuevos, no reiniciar todo
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
    } else if (items.length !== lastItemsLength) {
      // Solo para la carga inicial
      setVisibleItems(new Set());
      setHasStarted(false);
      setLastItemsLength(items.length);
      setLastAnimatedIndex(-1);
    }
  }, [items.length, lastItemsLength, delay]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          // Animar cada item con delay progresivo solo en la carga inicial
          items.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => new Set([...prev, index]));
            }, index * delay);
          });
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [items.length, delay, threshold, hasStarted]);

  return { containerRef, visibleItems, hasStarted };
};
