"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGuardados } from "@/context/GuardadosContext";
import SecondaryButton from "@/components/secondaryButton/SecondaryButton";
import { useInfiniteScrollAnimation } from "@/hooks/useInfiniteScrollAnimation";
import { getModelsData } from "@/lib/sanity-models";

export default function Home() {
  // Estado para los modelos de Sanity
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);

  // Context para manejar guardados
  const { addToGuardados, guardadosList } = useGuardados();

  // Estado para controlar qué tarjeta está expandida
  const [expandedCard, setExpandedCard] = useState(null);

  // Estado para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Estado para scroll infinito
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showPauseAt22, setShowPauseAt22] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Estado para prevenir hydration mismatches
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cargar datos de Sanity
  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelsData = await getModelsData();
        setModels(modelsData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    setIsClient(true);
    
    // Detectar si es móvil
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Calcular elementos para la página actual
  const totalPages = Math.ceil(models.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = isMobile 
    ? models.slice(startIndex, endIndex) // Móvil: solo página actual (6 elementos)
    : models.slice(0, endIndex); // Desktop: scroll infinito (acumulativo)

  // Hook para animación de fade in en secuencia con scroll infinito
  const { containerRef, visibleItems, hasStarted } = useInfiniteScrollAnimation(
    currentImages,
    300, // 300ms de delay entre cada card
    isMobile // Pasar el estado de móvil al hook
  );

  const toggleCard = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setExpandedCard(null); // Cerrar acordeón al cambiar página
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setExpandedCard(null); // Cerrar acordeón al cambiar página
    }
  };

  // Función para cargar más elementos (scroll infinito)
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    // Verificar si llegamos a 22 modelos (4 páginas de 6 = 24, pero queremos pausar en 22)
    const currentItemsCount = currentPage * itemsPerPage;
    if (currentItemsCount >= 22 && !showPauseAt22) {
      setShowPauseAt22(true);
      setShowBackToTop(true);
      return;
    }

    setIsLoading(true);

    // Simular delay de carga
    setTimeout(() => {
      if (currentPage < totalPages) {
        setCurrentPage((prev) => prev + 1);
        setExpandedCard(null);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 500);
  }, [currentPage, totalPages, isLoading, hasMore, showPauseAt22]);

  // Detectar scroll para cargar más elementos
  useEffect(() => {
    const handleScroll = () => {
      // Solo en desktop (lg y superiores)
      if (window.innerWidth >= 1024) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Cargar más cuando esté cerca del final (100px antes del final)
        if (scrollTop + windowHeight >= documentHeight - 100) {
          // Si estamos en la pausa de 22 modelos, continuar el scroll infinito
          if (showPauseAt22) {
            setShowPauseAt22(false);
            setShowBackToTop(false);
            // Continuar cargando más elementos
            loadMore();
          } else {
            loadMore();
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore, showPauseAt22]);

  const handleAddToGuardados = (e, model) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation(); // Prevenir que se active el Link padre
    addToGuardados(model);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (loading) {
    return (
      <main className="bg-white-00 pt-[216px] lg:ml-[25%] px-[14px] pb-[80px] lg:px-[24px] lg:pt-[24px]">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Cargando modelos...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white-00 pt-[216px] lg:ml-[25%] px-[14px] pb-[80px] lg:px-[24px] lg:pt-[24px]">
      <div 
        ref={containerRef}
        className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-[2px] gap-y-[32px] lg:max-w-[1282px] lg:ml-auto"
      >
        {currentImages.map((image, index) => (
          <div 
            key={image.id} 
            className={`w-full fade-in-stagger ${
              visibleItems.has(index) ? 'visible' : ''
            }`}
          >
            {/* Contenedor de la imagen */}
            <Link href={`/modelo/${image.id}`}>
              <div className="bg-white-00 w-full aspect-[3/4] relative overflow-hidden cursor-pointer lg:hover:opacity-100 transition-opacity group">
                {/* Placeholder para la imagen */}


                {/* Overlay con medidas - Solo visible en hover en desktop */}
                <div className="absolute inset-0  bg-opacity-90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden lg:flex flex-col  p-[20px]">
                  <div className="flex justify-between">
                    <div className="flex flex-col text-[14px] leading-[18px]">
                      <span>altura</span>
                      <span>busto</span>
                      <span>cintura</span>
                      <span>cadera</span>
                      <span>zapatos</span>
                    </div>
                    <div className="flex flex-col text-[14px] leading-[18px]">
                      <span>{image.height}</span>
                      <span>{image.bust}</span>
                      <span>{image.waist}</span>
                      <span>{image.hips}</span>
                      <span>{image.shoes}</span>
                    </div>
                  </div>
                </div>

                {/* Cuando tengas las imágenes reales, descomenta esto: */}
               
                <Image
                  src={image.coverPhoto}
                  alt={image.name}
                  fill
                  className="object-cover group-hover:opacity-20 transition-opacity duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
          
              </div>
            </Link>

            {/* Información debajo de la imagen */}
            <div className="bg-white-00 ">
              <div className="flex justify-between mt-[10px] px-[12px] items-end border-l border-grey-10">
                <div>
                  <p className="text-black-00 leading-[16px]">{image.name}</p>
                  <p
                    className="text-[12px] cursor-pointer hover:underline leading-[12px] pt-[5px] tracking-[-0.3px] lg:hidden"
                    onClick={() => toggleCard(image.id)}
                  >
                    {expandedCard === image.id
                      ? "ocultar medidas"
                      : "ver medidas"}
                  </p>
                </div>
                <div
                  className="text-[12px] lg:text-[16px] leading-[12px] flex gap-[4px] items-center cursor-pointer hover:opacity-70 transition-opacity"
                  onClick={(e) => handleAddToGuardados(e, image)}
                >
                  <p>add</p>
                  <p>( + )</p>
                </div>
              </div>
            </div>
            {/* Contenido expandible */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                expandedCard === image.id
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="bg-white-00  border-l border-grey-10">
                <div className=" px-[12px] py-[10px] text-sm text-grey-30 flex justify-start gap-[24px]">
                  <div>
                    <p className="">altura</p>
                    <p className="">busto</p>
                    <p className="">cintura</p>
                    <p className="">cadera</p>
                    <p className="">zapatos</p>
                  </div>
                  <div>
                    <p>{image.height}</p>
                    <p>{image.bust}</p>
                    <p>{image.waist}</p>
                    <p>{image.hips}</p>
                    <p>{image.shoes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginador - Solo visible en mobile */}
      {isClient && totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-[80px] lg:hidden">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={` py-2 text-sm ${
              currentPage === 1
                ? "text-grey-30 cursor-not-allowed"
                : "text-black-00 hover:underline cursor-pointer"
            }`}
          >
            anterior
          </button>

          <div className="text-sm text-black-00">
            {currentPage} / {totalPages}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={` py-2 text-sm ${
              currentPage === totalPages
                ? "text-grey-30 cursor-not-allowed"
                : "text-black-00 hover:underline cursor-pointer"
            }`}
          >
            siguiente
          </button>
        </div>
      )}

      {/* Indicador de carga para scroll infinito - Solo visible en desktop */}
      {isClient && (isLoading || showPauseAt22) && (
        <div className="hidden lg:flex max-w-[1282px] ml-auto justify-between items-center mt-[80px]">
          <div></div>
          <div className="text-sm text-grey-30">
            {showPauseAt22
              ? `ver más (${models.length - currentImages.length})`
              : "cargando más modelos..."}
          </div>
          {isClient && showBackToTop && (
            <div className="hidden lg:flex justify-end items-center">
              <SecondaryButton onClick={scrollToTop} px="14px">
                <span className="tracking-[-0.3px] leading-[16px]">
                  back to top
                </span>
              </SecondaryButton>
            </div>
          )}
        </div>
      )}
    </main>
  );
}