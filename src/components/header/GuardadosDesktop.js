"use client";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";

const GuardadosDesktop = ({ isOpen, onClose }) => {
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados, copyAllUrls } = useGuardados();

  // Calcular guardados por columna (máximo 11 por columna)
  const itemsPerColumn = 11;
  const totalGuardados = guardadosList.length;
  const guardadosColumns = [];
  
  for (let i = 0; i < totalGuardados; i += itemsPerColumn) {
    guardadosColumns.push(guardadosList.slice(i, i + itemsPerColumn));
  }

  return (
    <div
      className={`fixed left-0 right-auto w-1/4 top-[80px] h-[calc(100vh-80px)] bg-white-00 z-40 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="pt-[124px] px-[24px] pb-[24px] flex flex-col">
        <p className="mb-[36px] leading-[16px] tracking-[-0.4px]">
          — modelos
        </p>
        {/* Botón guardados dentro del menú expandido */}
        <div className="flex gap-[10px] items-center mb-[35px]">
          <div
            className="flex gap-[10px] items-center cursor-pointer"
            onClick={onClose}
          >
            <p className="opacity-100 translate-y-0">
              guardados
            </p>
            <SecondaryButton px="11px">
              <span>{isClient ? guardadosList.length : 0}</span>
            </SecondaryButton>
          </div>
        </div>
        <div className="py-4 flex gap-[8px] mb-[20px] flex-1">
          {isClient &&
            guardadosColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1">
                {column.map((model, index) => (
                  <div
                    key={`${columnIndex}-${index}`}
                    className="flex justify-start items-center gap-[16px] h-[12px] mb-[8px]"
                  >
                    <div className="flex justify-between items-center gap-[16px] border-r border-grey-10 pr-[8px] h-[12px] lg:w-[100px]">
                      <p>{model.name}</p>
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
