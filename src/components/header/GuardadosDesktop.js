"use client";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";

const GuardadosDesktop = ({ isOpen, onClose }) => {
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados, copyAllUrls } = useGuardados();

  // Calcular guardados por columna (máximo 15 por columna)
  const itemsPerColumn = 15;
  const totalGuardados = guardadosList.length;
  const guardadosColumns = [];
  
  for (let i = 0; i < totalGuardados; i += itemsPerColumn) {
    guardadosColumns.push(guardadosList.slice(i, i + itemsPerColumn));
  }

  return (
    <div
      className={`z-60 fixed left-0 right-auto w-1/4 top-[281px] h-[calc(100vh-281px)] bg-white-00 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="px-[24px] pb-[24px] flex flex-col">
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
        <div className="py-4 flex gap-[8px] mb-[20px] flex-1">
          {isClient &&
            guardadosColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1">
                {column.map((model, index) => (
                  <div
                    key={`${columnIndex}-${index}`}
                    className="flex justify-start items-center gap-[16px] h-[12px] my-[12px]"
                  >
                    <div className="flex justify-between items-center gap-[16px] border-r border-grey-10 pr-[8px] h-[12px] lg:w-[105px]">
                      <p>{model.name} {model.lastName?.charAt(0)}.</p>
                      <div
                        className="cursor-pointer hover:opacity-70 transition-opacity"
                        onClick={() => removeFromGuardados(model.id)}
                      >
                        <Cross />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
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
