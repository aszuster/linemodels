"use client";
import Cross from "@/svg/cross";
import Image from "next/image";
import { useGuardados } from "@/context/GuardadosContext";

const GuardadosMobile = ({ isOpen, onClose }) => {
  const {
    guardadosList,
    isClient,
    removeFromGuardados,
    clearAllGuardados,
    copyAllUrls,
  } = useGuardados();

  return (
    <div
      className={`fixed top-[40px] pt-[40px] left-0 right-0 bg-white-00 z-40 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-y-0 max-h-[calc(100vh-80px)]"
          : "opacity-0 -translate-y-full max-h-0 pointer-events-none"
      }`}
    >
      <div className="pt-[16px] px-[20px] pb-[40px] flex flex-col">
        <div className="py-4 mb-[36px] max-h-[calc(100vh-240px)] overflow-y-auto">
          {isClient && guardadosList.length > 0 ? (
            <div className="flex flex-col gap-[12px]">
              {guardadosList.map((model) => (
                <div key={model.id} className="flex items-start gap-[12px] border-t border-grey-10 pt-[8px]">
                  {/* Miniatura de la imagen */}
                  <div className="relative w-[40px] h-[60px] flex-shrink-0 overflow-hidden">
                    {model.coverPhoto ? (
                      <Image
                        src={model.coverPhoto}
                        alt={`${model.name} ${model.lastName}`}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full bg-grey-10"></div>
                    )}
                  </div>

                  {/* Nombre y botón de eliminar */}
                  <div className="flex justify-between items-center flex-1">
                    <p className="text-[14px] leading-[16px]">
                      {model.name} {model.lastName}
                    </p>
                    <div
                      className="cursor-pointer hover:opacity-70 transition-opacity flex items-center gap-[4px]"
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
          ) : (
            isClient && (
              <p className="text-grey-20 text-center py-4">
                No hay modelos guardados
              </p>
            )
          )}
        </div>
        <div className="flex justify-between items-center text-grey-20">
          <div className="flex gap-[16px] items-center">
            <p className="cursor-pointer hover:underline" onClick={copyAllUrls}>
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
          <div>
            <p className="cursor-pointer hover:underline" onClick={onClose}>
              cerrar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuardadosMobile;
