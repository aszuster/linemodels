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

  // Calcular número de columnas y modelos por columna según el breakpoint
  let maxColumns = 3;
  let itemsPerColumn = 20;

  if (windowWidth >= 1920) {
    // xxl: 5 columnas, 12 modelos por columna
    maxColumns = 5;
    itemsPerColumn = 12;
  } else if (windowWidth >= 1440) {
    // xl: 4 columnas, 15 modelos por columna
    maxColumns = 4;
    itemsPerColumn = 15;
  } else if (windowWidth >= 1025) {
    // lg: 3 columnas, 20 modelos por columna
    maxColumns = 3;
    itemsPerColumn = 20;
  }

  // Máximo 60 modelos
  const displayedModels = guardadosList.slice(0, 60);
  const totalGuardados = displayedModels.length;
  
  // Calcular número de columnas necesarias
  const numColumnsNeeded = Math.min(Math.ceil(totalGuardados / itemsPerColumn), maxColumns);
  
  // Distribuir modelos en columnas
  const guardadosColumns = [];
  for (let i = 0; i < numColumnsNeeded; i++) {
    guardadosColumns.push([]);
  }
  
  displayedModels.forEach((model, index) => {
    const columnIndex = Math.floor(index / itemsPerColumn);
    if (columnIndex < numColumnsNeeded) {
      guardadosColumns[columnIndex].push(model);
    }
  });

  return (
    <div
      style={{ width: `${headerWidth}px` }}
      className={`z-60 fixed left-0 right-auto top-[281px] h-[calc(100vh-281px)] bg-white-00 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="px-[24px] pb-[24px] flex flex-col h-full">
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
        <div className="py-4 flex gap-[56px] mb-[20px] flex-1 overflow-y-auto overflow-x-hidden pr-[20px]">
          {isClient && displayedModels.length > 0 ? (
            guardadosColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="w-[280px] flex-shrink-0 flex flex-col gap-[12px]">
                {column.map((model, index) => (
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
        
        <div className="flex justify-between items-center text-grey-20">
          <div className="flex gap-[16px] items-center">
            <p 
              className="cursor-pointer hover:underline"
              onClick={copyAllUrls}
            >
              copiar todos
            </p>
            <div className="bg-grey-10 w-[1px] h-[9px]"></div>
            <p
              className="cursor-pointer hover:underline"
              onClick={clearAllGuardados}
            >
              borrar todos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardadosDesktop;
