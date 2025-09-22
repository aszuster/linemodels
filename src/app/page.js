"use client";
import { useState, useEffect } from "react";
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
  
  // Estado para prevenir hydration mismatches
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Calcular elementos para la página actual
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentImages = images.slice(startIndex, endIndex);

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

  const handleAddToGuardados = (e, name) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation(); // Prevenir que se active el Link padre
    addToGuardados(name);
  };

  return (
    <main className=" bg-white-00 pt-[216px] px-[14px] pb-[80px]">
      <div className="w-full grid grid-cols-2 gap-x-[2px] gap-y-[32px]">
        {currentImages.map((image) => (
          <div key={image.id} className="w-full">
            {/* Contenedor de la imagen */}
            <Link href={`/modelo/${image.id}`}>
              <div className="bg-grey-10 w-full aspect-[3/4] relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity">
                {/* Placeholder para la imagen */}
                <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-sm">
                  {image.name}
                </div>
                {/* Cuando tengas las imágenes reales, descomenta esto: */}
                {/* 
                <Image
                  src={image.photos[0]}
                  alt={image.name}
                  fill
                  className="object-cover"
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
                    className="text-[12px] cursor-pointer hover:underline leading-[12px] pt-[5px] tracking-[-0.3px]"
                    onClick={() => toggleCard(image.id)}
                  >
                    {expandedCard === image.id
                      ? "ocultar medidas"
                      : "ver medidas"}
                  </p>
                </div>
                <div 
                  className="text-[12px] leading-[12px] flex gap-[4px] items-center cursor-pointer hover:opacity-70 transition-opacity"
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
      
      {/* Paginador */}
      {isClient && totalPages > 1 && (
        <div className="flex justify-between items-center gap-4 mt-[80px]">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={` py-2 text-sm ${
              currentPage === 1
                ? 'text-grey-30 cursor-not-allowed'
                : 'text-black-00 hover:underline cursor-pointer'
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
                ? 'text-grey-30 cursor-not-allowed'
                : 'text-black-00 hover:underline cursor-pointer'
            }`}
          >
            siguiente
          </button>
        </div>
      )}
    </main>
  );
}
