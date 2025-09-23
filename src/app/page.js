"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { modelsData } from "@/data/models";
import { useGuardados } from "@/context/GuardadosContext";

export default function Home() {
  // Usar los datos reales de los modelos
  const images = modelsData;

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

  // Estado para prevenir hydration mismatches
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calcular elementos para la página actual
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(0, endIndex); // Mostrar todos los elementos hasta el final actual

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
  }, [currentPage, totalPages, isLoading, hasMore]);

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
          loadMore();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMore]);

  const handleAddToGuardados = (e, name) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation(); // Prevenir que se active el Link padre
    addToGuardados(name);
  };

  return (
    <main className="bg-white-00 pt-[216px] lg:ml-[25%] px-[14px] pb-[80px] lg:px-[24px] lg:pt-[24px]">
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-x-[2px] gap-y-[32px] lg:max-w-[1282px] lg:ml-auto">
        {currentImages.map((image) => (
          <div key={image.id} className="w-full">
            {/* Contenedor de la imagen */}
            <Link href={`/modelo/${image.id}`}>
              <div className="bg-grey-10 w-full aspect-[3/4] relative overflow-hidden cursor-pointer lg:hover:opacity-100 transition-opacity group">
                {/* Placeholder para la imagen */}
                <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-sm group-hover:opacity-20 transition-opacity duration-300">
                  {image.name}
                </div>

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
                    {/* <div className="space-y-2 text-[14px] leading-[18px] text-left">
                      <div className="flex justify-between ga p-4">
                        <span className="text-black-00">altura</span>
                        <span>{image.height}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-black-00">busto</span>
                        <span>{image.bust}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-black-00">cintura</span>
                        <span>{image.waist}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-black-00">cadera</span>
                        <span>{image.hips}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-black-00">zapatos</span>
                        <span>{image.shoes}</span>
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Cuando tengas las imágenes reales, descomenta esto: */}
                {/* 
                <Image
                  src={image.photos[0]}
                  alt={image.name}
                  fill
                  className="object-cover group-hover:opacity-20 transition-opacity duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                />
                */}
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
                  onClick={(e) => handleAddToGuardados(e, image.name)}
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
      {isClient && isLoading && (
        <div className="hidden lg:flex justify-center items-center mt-[80px]">
          <div className="text-sm text-grey-30">Cargando más modelos...</div>
        </div>
      )}

      {/* Indicador de fin de contenido - Solo visible en desktop */}
      {/* {isClient && !hasMore && currentImages.length === images.length && (
        <div className="hidden lg:flex justify-center items-center mt-[80px]">
          <div className="text-sm text-grey-30">Has visto todos los modelos</div>
        </div>
      )} */}
    </main>
  );
}
