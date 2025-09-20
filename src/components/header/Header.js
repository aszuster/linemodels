"use client";
import { useState } from "react";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";

const Header = () => {
  const [isGuardadosOpen, setIsGuardadosOpen] = useState(false);

  // Lista de nombres guardados
  const guardadosList = [
    "Juan",
    "María",
    "Carlos",
    "Ana",
    "Luis",
    "Sofia",
    "Diego",
    "Elena",
  ];

  const toggleGuardados = () => {
    setIsGuardadosOpen(!isGuardadosOpen);
  };

  return (
    <header className="bg-white-00 text-black-00 px-[20px] pt-[16px]">
      <div className="mb-[10px] flex justify-between items-center">
        <div>
          <h1 className="text-[20px] font-normal	leading-[24px]">line</h1>
        </div>
        <div className="flex gap-[10px] items-center">
          <div
            className="flex gap-[10px] items-center cursor-pointer"
            onClick={toggleGuardados}
          >
            <p>Guardados</p>
            <SecondaryButton>
              <span>0</span>
            </SecondaryButton>
          </div>
        </div>
        <div className="bg-grey-10 w-[1px] h-[16px] absolute left-[50%] translate-x-[-50%]"></div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isGuardadosOpen
            ? "max-h-96 opacity-100 pt-[40px] pb-[36px]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white-00 py-4 flex gap-[24px] overflow-x-scroll scrollbar-hide mb-[36px]">
          {guardadosList.map((nombre, index) => (
            <div
              key={index}
              className="[&:not(:last-child)]:border-r-1 border-grey-10 pr-[20px] flex justify-center items-center gap-[16px]"
            >
              <p>{nombre}</p>
              <Cross />
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-grey-20">
            <div className="flex gap-[16px] items-center">
                <p>copiar todos</p>
                <div className="bg-grey-10 w-[1px] h-[9px]"></div>
                <p>borrar todos</p>
            </div>
            <div>Total: 6</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
