"use client";
import { useState, useEffect } from "react";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";
import HorizontalLine from "@/svg/horizontalLine";
import { modelsData } from "@/data/models";

const Header = () => {
  const [isGuardadosOpen, setIsGuardadosOpen] = useState(false);
  const [showGuardadosText, setShowGuardadosText] = useState(true);
  const [isModelsExpanded, setIsModelsExpanded] = useState(false);
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados } =
    useGuardados();

  const toggleGuardados = () => {
    setIsGuardadosOpen(!isGuardadosOpen);
  };

  const toggleModelsExpansion = () => {
    setIsModelsExpanded(!isModelsExpanded);
  };

  // Calcular modelos a mostrar
  const totalModels = modelsData.length;
  const shouldShowExpandButton = totalModels > 21;
  const firstColumnModels = modelsData.slice(0, 21); // Siempre los primeros 21 en la primera columna
  const secondColumnModels = isModelsExpanded ? modelsData.slice(21) : []; // Solo los adicionales en la segunda columna

  // Calcular guardados por columna (máximo 11 por columna)
  const itemsPerColumn = 11;
  const totalGuardados = guardadosList.length;
  const guardadosColumns = [];
  
  for (let i = 0; i < totalGuardados; i += itemsPerColumn) {
    guardadosColumns.push(guardadosList.slice(i, i + itemsPerColumn));
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Mostrar el texto cuando esté en el top (scrollTop < 50px) O cuando el modal esté abierto
      setShowGuardadosText(scrollTop < 50 || isGuardadosOpen);
    };

    // Agregar el event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function para remover el event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isGuardadosOpen]); // Agregamos isGuardadosOpen como dependencia

  // Efecto adicional para manejar cuando se abre/cierra el modal
  useEffect(() => {
    if (isGuardadosOpen) {
      setShowGuardadosText(true);
    } else {
      // Solo ocultar si no estamos en el top
      const scrollTop = window.scrollY;
      setShowGuardadosText(scrollTop < 50);
    }
  }, [isGuardadosOpen]);

  return (
    <>
      {/* Header fijo que siempre se mantiene visible */}
      <header className="fixed top-0 left-0 right-0 lg:left-0 lg:top-0 lg:right-auto lg:w-1/4 lg:h-screen bg-white-00 text-black-00 px-[20px] pt-[16px] lg:px-[24px] lg:pt-[24px] z-30">
        <div className="mb-[10px] flex justify-between items-center lg:flex-col lg:items-start lg:justify-start lg:h-full">
          <div>
            <Link href="/">
              <h1 className="text-[20px] font-normal	leading-[24px] lg:text-[29px] lg:mb-[152px] z-50">
                line
              </h1>
            </Link>
          </div>
          <div className="hidden lg:block lg:mb-[20px]">
            <p className="mb-[17px] leading-[16px] tracking-[-0.4px]">
              — modelos
            </p>

            {/* Lista de modelos */}
            <div className="space-y-[8px]">
              <div className="grid grid-cols-2 gap-x-[80px] gap-y-[6px]">
                {/* Primera columna - siempre visible */}
                <div className="space-y-[6px]">
                  {firstColumnModels.map((model) => (
                    <Link
                      key={model.id}
                      href={`/modelo/${model.id}`}
                      className="block text-[16px] leading-[16px] tracking-[-0.4px] hover:underline transition-all duration-200"
                    >
                      {model.name}
                    </Link>
                  ))}
                </div>

                {/* Segunda columna - con transición */}
                <div className="space-y-[6px]">
                  <div
                    className={`transition-all duration-600 ease-in-out ${
                      isModelsExpanded
                        ? "opacity-100 max-h-[1000px]"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {secondColumnModels.map((model) => (
                      <Link
                        key={model.id}
                        href={`/modelo/${model.id}`}
                        className="block text-[16px] leading-[16px] mb-[6px] tracking-[-0.4px] hover:underline transition-all duration-200"
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botón fijo */}
              {shouldShowExpandButton && (
                <button
                  onClick={toggleModelsExpansion}
                  className="text-[16px] text-grey-40 hover:text-black-00 hover:underline transition-colors duration-200 mt-[8px]"
                >
                  {isModelsExpanded ? "ver -" : "ver +"}
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-[10px] items-center lg:flex-col lg:items-start lg:gap-[20px] lg:mb-[35px]">
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={toggleGuardados}
            >
              <p
                className={`transition-all duration-300 ease-in-out ${
                  showGuardadosText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none lg:translate-y-0 lg:opacity-100"
                }`}
              >
                guardados
              </p>
              <SecondaryButton px="11px">
                <span>{isClient ? guardadosList.length : 0}</span>
              </SecondaryButton>
            </div>
          </div>
          <div className="bg-grey-10 w-[1px] h-[16px] absolute left-[50%] translate-x-[-50%] lg:hidden"></div>
          <div className="hidden lg:flex lg:flex-col lg:gap-[42px]">
            <div className="flex flex-col">
              <p className="pb-[34px]">✦ ia lab</p>
              <p className="tracking-[-0.2px] leading-[16px] mb-[10px]">
              — contacto
              </p>
              <div className="text-grey-40 leading-[16px]">
                <p className="pb-[6px]">hola@linemodels.co</p>
                <p>buenos aires, argentina.</p>
              </div>

              <button
                // onClick={openModelModal}
                className="tracking-[-0.3px] flex gap-[14px] items-center mt-[34px]"
              >
                <p>querés ser modelo?</p>
                <SecondaryButton>
                  <span>+</span>
                </SecondaryButton>
              </button>
            </div>
            <div>
              <Link href="https://www.instagram.com/line/" target="_blank">
                instagram
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Acordeón que se ajusta al contenido */}
      <div
        className={`fixed top-0 left-0 right-0 lg:left-0 lg:right-auto lg:w-1/4 lg:top-[80px] lg:h-[calc(100vh-80px)] bg-white-00 z-40 transition-all duration-300 ease-in-out ${
          isGuardadosOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-full pointer-events-none"
        }`}
      >
        {/* Botón de cerrar en la esquina superior derecha */}
        {/* <div className="absolute top-4 right-4 z-40">
          <div 
            className="cursor-pointer p-2 hover:bg-grey-10 rounded-full transition-colors"
            onClick={toggleGuardados}
          >
            <Cross />
          </div>
        </div> */}

        <div className="pt-[96px] px-[20px] pb-[40px] lg:pt-[24px] lg:px-[24px] lg:pb-[24px] flex flex-col lg:h-full">
          <p className="hidden lg:block mb-[17px] leading-[16px] tracking-[-0.4px]">
              — modelos
            </p>
            <div className="hidden lg:flex gap-[10px] items-center lg:flex-col lg:items-start lg:gap-[20px] lg:mb-[35px]">
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={toggleGuardados}
            >
              <p
                className={`transition-all duration-300 ease-in-out ${
                  showGuardadosText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none lg:translate-y-0 lg:opacity-100"
                }`}
              >
                guardados
              </p>
              <SecondaryButton px="11px">
                <span>{isClient ? guardadosList.length : 0}</span>
              </SecondaryButton>
            </div>
          </div>
          <div className="py-4 flex gap-[8px] mb-[36px] lg:mb-[20px]">
            {isClient &&
              guardadosColumns.map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1">
                  {column.map((nombre, index) => (
                    <div
                      key={`${columnIndex}-${index}`}
                      className="flex justify-start items-center gap-[16px] h-[12px] mb-[8px]"
                    >
                      <div className="flex items-center gap-[16px] border-r border-grey-10 pr-[8px] h-[12px]">
                        <p>{nombre}</p>
                        <div
                          className="cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => removeFromGuardados(nombre)}
                        >
                          <Cross />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
          <div className="flex justify-between items-center text-grey-20 lg:mt-auto">
            <div className="flex gap-[16px] items-center">
              <p className="cursor-pointer hover:underline">copiar todos</p>
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
    </>
  );
};

export default Header;
