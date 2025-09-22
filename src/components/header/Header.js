"use client";
import { useState, useEffect } from "react";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";

const Header = () => {
  const [isGuardadosOpen, setIsGuardadosOpen] = useState(false);
  const [showGuardadosText, setShowGuardadosText] = useState(true);
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados } =
    useGuardados();

  const toggleGuardados = () => {
    setIsGuardadosOpen(!isGuardadosOpen);
  };

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
      <header className="fixed top-0 left-0 right-0 bg-white-00 text-black-00 px-[20px] pt-[16px] z-30">
        <div className="mb-[10px] flex justify-between items-center">
          <div>
            <Link href="/">
              <h1 className="text-[20px] font-normal	leading-[24px]">line</h1>
            </Link>
          </div>
          <div className="flex gap-[10px] items-center">
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={toggleGuardados}
            >
              <p
                className={`transition-all duration-300 ease-in-out ${
                  showGuardadosText
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 pointer-events-none"
                }`}
              >
                guardados
              </p>
              <SecondaryButton px="11px">
                <span>{isClient ? guardadosList.length : 0}</span>
              </SecondaryButton>
            </div>
          </div>
          <div className="bg-grey-10 w-[1px] h-[16px] absolute left-[50%] translate-x-[-50%]"></div>
        </div>
      </header>

      {/* Acordeón que se ajusta al contenido */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white-00 z-20 transition-all duration-300 ease-in-out ${
          isGuardadosOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
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

        <div className="pt-[96px] px-[20px] pb-[40px] flex flex-col">
          <div className="py-4 flex flex-col md:flex-row gap-[16px] mb-[36px] md:flex-wrap">
            {isClient &&
              guardadosList.map((nombre, index) => (
                  <div
                    key={index}
                    className="w-1/2 md:w-auto lg:border-r-1 lg:border-grey-10 lg:pr-[20px] flex justify-start items-center gap-[16px] h-[12px]"
                  >
                  <p>{nombre}</p>
                  <div
                    className="cursor-pointer hover:opacity-70 transition-opacity"
                    onClick={() => removeFromGuardados(nombre)}
                  >
                    <Cross />
                  </div>
                </div>
              ))}
          </div>
          <div className="flex justify-between items-center text-grey-20">
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
