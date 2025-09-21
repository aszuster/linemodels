"use client";
import { useState } from "react";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";

const Header = () => {
  const [isGuardadosOpen, setIsGuardadosOpen] = useState(false);
  const { guardadosList, isClient, removeFromGuardados, clearAllGuardados } = useGuardados();

  const toggleGuardados = () => {
    setIsGuardadosOpen(!isGuardadosOpen);
  };

  return (
    <>
      {/* Header fijo que siempre se mantiene visible */}
      <header className="fixed top-0 left-0 right-0 bg-white-00 text-black-00 px-[20px] pt-[16px] z-30">
        <div className="mb-[10px] flex justify-between items-center">
          <div>
            <Link href="/"><h1 className="text-[20px] font-normal	leading-[24px]">line</h1></Link>
          </div>
          <div className="flex gap-[10px] items-center">
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={toggleGuardados}
            >
              <p>Guardados</p>
              <SecondaryButton>
                <span>{isClient ? guardadosList.length : 0}</span>
              </SecondaryButton>
            </div>
          </div>
          <div className="bg-grey-10 w-[1px] h-[16px] absolute left-[50%] translate-x-[-50%]"></div>
        </div>
      </header>

      {/* Acordeón que ocupa toda la pantalla */}
      <div
        className={`fixed inset-0 bg-white-00 z-20 transition-all duration-300 ease-in-out ${
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

        <div className="pt-[160px] px-[20px] h-full flex flex-col">
          <div className=" mb-[36px]">
            <p className="pb-[36px]">modelos</p>
            <div className="flex items-center">
              <span className="border-r-1 border-grey-10 pr-[20px]">
                guardados
              </span>
               <span className="border-r-1 border-grey-10 px-[8px]">{isClient ? guardadosList.length : 0}</span>
              <div 
                className="ml-[24px] cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => {
                  clearAllGuardados();
                  setIsGuardadosOpen(false);
                }}
              >
                <Cross />
              </div>
            </div>
          </div>
          <div className="py-4 flex gap-[16px] mb-[36px] flex-wrap">
            {isClient &&
              guardadosList.map((nombre, index) => (
                <div
                  key={index}
                  className="border-r-1 border-grey-10 pr-[20px] flex justify-center items-center gap-[16px] h-[12px]"
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
            <div>Total: {isClient ? guardadosList.length : 0}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
