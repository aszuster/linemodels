"use client";
import Cross from "@/svg/cross";
import { useGuardados } from "@/context/GuardadosContext";

const GuardadosMobile = ({ isOpen, onClose }) => {
  const {
    guardadosList,
    isClient,
    removeFromGuardados,
    clearAllGuardados,
    copyAllUrls,
  } = useGuardados();

  // Calcular guardados por columna (máximo 11 por columna)
  const itemsPerColumn = 11;
  const totalGuardados = guardadosList.length;
  const guardadosColumns = [];

  for (let i = 0; i < totalGuardados; i += itemsPerColumn) {
    guardadosColumns.push(guardadosList.slice(i, i + itemsPerColumn));
  }

  return (
    <div
      className={`fixed top-[40px] pt-[40px] left-0 right-0 bg-white-00 z-40 transition-all duration-300 ease-in-out ${
        isOpen
          ? "opacity-100 translate-y-0 max-h-[calc(100vh-80px)]"
          : "opacity-0 -translate-y-full max-h-0 pointer-events-none"
      }`}
    >
      <div className="pt-[16px] px-[20px] pb-[40px] flex flex-col">
        <div className="absolute top-[16px] right-[20px]">
          <Cross onClick={onClose} width="12px" height="12px" />
        </div>
        <div className="py-4 flex gap-[8px] mb-[36px]">
          {isClient &&
            guardadosColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="flex-1">
                {column.map((model, index) => (
                  <div
                    key={`${columnIndex}-${index}`}
                    className="flex justify-start items-center gap-[16px] h-[12px] mb-[8px]"
                  >
                    {/* en caso de cambiar de parecer sacar w-[100px] y justify-between */}
                    <div className="flex justify-between items-center gap-[16px] border-r border-grey-10 pr-[8px] h-[12px] w-[100px]">
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
        </div>
      </div>
    </div>
  );
};

export default GuardadosMobile;
