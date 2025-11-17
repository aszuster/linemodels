"use client";
import Cross from "@/svg/cross";
import Image from "next/image";
import { useState, useEffect } from "react";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";

const GuardadosDesktop = ({ isOpen, onClose, headerWidth }) => {
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados, copyAllUrls } = useGuardados();
  
  // Estado para el tamaño de la ventana
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);

  // Detectar cambios de tamaño de ventana
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calcular número de columnas según el breakpoint
  let maxColumns = 3;

  if (windowWidth >= 1920) {
    // xxl: 5 columnas
    maxColumns = 5;
  } else if (windowWidth >= 1440) {
    // xl: 4 columnas
    maxColumns = 4;
  } else if (windowWidth >= 1025) {
    // lg: 3 columnas
    maxColumns = 3;
  }

  // Máximo 60 modelos
  const displayedModels = guardadosList.slice(0, 60);
  const totalGuardados = displayedModels.length;
  
  // Calcular número de columnas (siempre usamos maxColumns para distribución por fila)
  const numColumns = maxColumns;
  
  // Calcular número de filas necesarias
  const numRows = Math.ceil(totalGuardados / numColumns);
  
  // Distribuir modelos por FILA (horizontalmente)
  const guardadosRows = [];
  for (let i = 0; i < numRows; i++) {
    const startIndex = i * numColumns;
    const endIndex = Math.min(startIndex + numColumns, totalGuardados);
    guardadosRows.push(displayedModels.slice(startIndex, endIndex));
  }

  return (
    <div
      style={{ 
        width: isOpen ? `${headerWidth}px` : '0px',
        transitionTimingFunction: 'cubic-bezier(0.45, 0, 0.55, 1)'
      }}
      className={`z-60 fixed left-0 right-auto top-[281px] h-[calc(100vh-281px)] bg-white-00 transition-[width] duration-[400ms] overflow-hidden ${
        isOpen
          ? ""
          : "pointer-events-none"
      }`}
    >
      <div 
        style={{ 
          width: `${headerWidth - 48}px`,
        }}
        className="px-[24px] pb-[24px] flex flex-col h-full"
      >
        {/* <Link href="/" className="mb-[36px] leading-[16px] tracking-[-0.4px]">
          — modelos
        </Link> */}
        {/* Botón guardados dentro del menú expandido */}
        {/* <div className="flex gap-[10px] items-center mb-[35px] justify-between">
          <div
            className="flex gap-[10px] items-center cursor-pointer"
            onClick={onClose}
          >
            <p className="opacity-100 translate-y-0 underline">
              guardados
            </p>
            <SecondaryButton px="11px">
              <span>{isClient ? guardadosList.length : 0}</span>
            </SecondaryButton>
          </div>
          <div onClick={onClose}><p className="cursor-pointer hover:underline text-grey-20">cerrar</p></div>
        </div> */}
        <div className="py-4 flex flex-col gap-[12px] mb-[20px] flex-1 overflow-y-auto overflow-x-hidden pr-[20px]">
          {isClient && displayedModels.length > 0 ? (
            guardadosRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid gap-[56px]" style={{ gridTemplateColumns: `repeat(${numColumns}, 260px)` }}>
                {row.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-start gap-[12px] border-t border-grey-10 pt-[8px]"
                  >
                    {/* Miniatura de la imagen */}
                    <div className="relative w-[32px] h-[48px] flex-shrink-0 overflow-hidden">
                      {model.coverPhoto ? (
                        <Image
                          src={model.coverPhoto}
                          alt={`${model.name} ${model.lastName}`}
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      ) : (
                        <div className="w-full h-full bg-grey-10"></div>
                      )}
                    </div>

                    {/* Nombre y botón de eliminar */}
                    <div className="flex justify-between items-center flex-1 min-w-0 gap-[8px]">
                      <p className="text-[16px] leading-[100%] flex-shrink">
                        {model.name} {model.lastName}
                      </p>
                      <div
                        className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-[4px] flex-shrink-0"
                        onClick={() => removeFromGuardados(model.id)}
                      >
                        <span>[</span>
                        <Cross />
                        <span>]</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            isClient && (
              <p className="text-grey-20 text-center py-4 w-full">
                No hay modelos guardados
              </p>
            )
          )}
        </div>
        
        <div className="flex justify-between items-center text-black-00">
          <div className="flex gap-[16px] items-center">
            <p 
              className="cursor-pointer hover:text-grey-20 transition-all duration-300 ease-in-out"
              onClick={copyAllUrls}
            >
              copiar todo
            </p>
            <div className="bg-grey-10 w-[1px] h-[9px]"></div>
            <p
              className="cursor-pointer hover:text-grey-20 transition-all duration-300 ease-in-out"
              onClick={clearAllGuardados}
            >
              borrar todo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardadosDesktop;
