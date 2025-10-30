"use client";
import { useState, useEffect } from "react";
import Cross from "@/svg/cross";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import { useGuardados } from "@/context/GuardadosContext";
import Link from "next/link";
import HorizontalLine from "@/svg/horizontalLine";
import { modelsData } from "@/data/models";
import { getModelsData } from "@/lib/sanity-models";
import GuardadosMobile from "./GuardadosMobile";
import GuardadosDesktop from "./GuardadosDesktop";
import Star from "@/svg/star";

const Header = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const [isGuardadosOpen, setIsGuardadosOpen] = useState(false);
  const [showGuardadosText, setShowGuardadosText] = useState(true);
  const [isModelsExpanded, setIsModelsExpanded] = useState(false);
  const { guardadosList, isClient } = useGuardados();

  useEffect(() => {
    const loadModels = async () => {
      try {
        const modelsData = await getModelsData();
        setModels(modelsData);
        setLoading(false);
      } catch (error) {
        console.error("Error loading models:", error);
        setLoading(false);
      }
    };

    loadModels();
  }, []);

  const openModelModal = () => {
    setIsModelModalOpen(true);
  };

  const closeModelModal = () => {
    setIsModelModalOpen(false);
  };

  const toggleGuardados = () => {
    setIsGuardadosOpen(!isGuardadosOpen);
  };

  const closeGuardados = () => {
    setIsGuardadosOpen(false);
  };

  const toggleModelsExpansion = () => {
    setIsModelsExpanded(!isModelsExpanded);
  };

  // Calcular modelos a mostrar
  const totalModels = models.length;
  const shouldShowExpandButton = totalModels > 14;
  const firstColumnModels = models.slice(0, 14); // Siempre los primeros 14 en la primera columna
  const secondColumnModels = isModelsExpanded ? models.slice(14, 28) : []; // Los siguientes 14 en la segunda columna
  const thirdColumnModels = isModelsExpanded ? models.slice(28) : []; // Los restantes en la tercera columna

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
      <header className="z-50 fixed top-0 left-0 right-0 lg:left-0 lg:top-0 lg:right-auto lg:w-1/4 lg:h-screen bg-white-00 text-black-00 px-[20px] pt-[16px] lg:px-[24px] lg:pt-[24px]">
        <div className="mb-[10px] flex justify-between items-center lg:flex-col lg:items-start lg:h-full">
          <div className="lg:w-full ">
            <Link href="/" onClick={isGuardadosOpen ? closeGuardados : undefined}>
              <h1 className="text-[24px] font-normal	leading-[24px] lg:text-[30px]  z-50">
                line
              </h1>
            </Link>
            <div className="hidden lg:block mb-[17px] lg:mt-[150px]">
            <Link href="/" className=" leading-[16px] tracking-[-0.4px]">
              — modelos
            </Link>
          </div>
          <div className="hidden lg:flex gap-[10px] items-center lg:w-full lg:justify-between">
            <div
              className="flex gap-[10px] items-center cursor-pointer"
              onClick={toggleGuardados}
            >
              <p
                className={`transition-all duration-300 ease-in-out ${
                  showGuardadosText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none lg:translate-y-0 lg:opacity-100"
                } ${isGuardadosOpen ? "underline" : ""}`}
              >
                guardados
              </p>
              <SecondaryButton px="11px">
                <span>{isClient ? guardadosList.length : 0}</span>
              </SecondaryButton>
            </div>
            {isGuardadosOpen && (
            <div onClick={toggleGuardados}><p className="cursor-pointer hover:underline text-grey-20">cerrar</p></div>
            )}
            {/* <p className="hidden lg:flex pb-[34px]  items-center gap-[6px]"><Star /> ia lab</p> */}
          </div>
          </div>


          <div>
            {/* palabra modelos desktop */}

            {/* <div className="hidden lg:block lg:mb-[20px]">
              <div className="mb-[17px]">
                <Link href="/" className=" leading-[16px] tracking-[-0.4px]">
                  — modelos
                </Link>
              </div> */}

            {/* Lista de modelos */}
            {/* <div className="space-y-[8px]">
              <div className="grid grid-cols-3 gap-x-[40px] gap-y-[6px]"> */}
            {/* Primera columna - siempre visible */}
            {/* <div className="space-y-[6px]">
                  {firstColumnModels.map((model) => (
                    <Link
                      key={model.id}
                      href={`/modelo/${model.id}`}
                      className="block text-[16px] leading-[16px] tracking-[-0.4px] hover:underline transition-all duration-200"
                    >
                      {model.name}
                    </Link>
                  ))}
                </div> */}

            {/* Segunda columna - con transición */}
            {/* <div className="space-y-[6px]">
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
                        className="block text-[16px] leading-[16px] mb-[6px] tracking-[-0.4px] hover:underline transition-all duration-200 lowercase"
                      >
                        {model.name}
                      </Link>
                    ))}
                  </div>
                </div> */}

            {/* Tercera columna - con transición */}
            {/* <div className="space-y-[6px]">
                  <div
                    className={`transition-all duration-600 ease-in-out ${
                      isModelsExpanded
                        ? "opacity-100 max-h-[1000px]"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {thirdColumnModels.map((model) => (
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
              </div> */}

            {/* Botón fijo */}
            {/* {shouldShowExpandButton && (
                <button
                  onClick={toggleModelsExpansion}
                  className="text-[16px] text-grey-40 hover:text-black-00 hover:underline transition-colors duration-200 mt-[8px]"
                >
                  {isModelsExpanded ? "ver -" : "ver +"}
                </button>
              )}
            </div> */}

            {/* </div> */}
                      {/* guardados desktop */}
            <div className="lg:hidden flex gap-[10px] items-center lg:flex-col lg:items-start lg:gap-[20px] ">
              <div
                className="flex gap-[10px] items-center cursor-pointer"
                onClick={toggleGuardados}
              >
                <p
                  className={`transition-all duration-300 ease-in-out ${
                    showGuardadosText
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2 pointer-events-none lg:translate-y-0 lg:opacity-100"
                  } ${isGuardadosOpen ? "underline" : ""}`}
                >
                  guardados
                </p>
                <SecondaryButton px="11px">
                  <span>{isClient ? guardadosList.length : 0}</span>
                </SecondaryButton>
              </div>

            {/* ia lab link */}

            {/* <p className="hidden lg:flex pb-[34px]  items-center gap-[6px]"><Star /> ia lab</p> */}
            </div>
          </div>
          <div className="bg-grey-10 w-[1px] h-[16px] absolute left-[50%] translate-x-[-50%] lg:hidden"></div>
          <div className="hidden lg:flex lg:flex-col lg:gap-[20px] lg:mb-[24px]">
            <div className="flex flex-col">
              <p className="tracking-[-0.2px] leading-[16px] mb-[10px]">
                — contacto
              </p>
              <div className="text-grey-40 leading-[16px]">
                <p className="pb-[6px]">hola@linemodels.xyz</p>
                <p>buenos aires, argentina.</p>
              </div>

              <button
                onClick={openModelModal}
                className="tracking-[-0.3px] flex gap-[14px] items-center mt-[34px] cursor-pointer"
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

      {/* Componentes separados para mobile y desktop */}
      <div className="lg:hidden">
        <GuardadosMobile isOpen={isGuardadosOpen} onClose={closeGuardados} />
      </div>
      <div className="hidden lg:block">
        <GuardadosDesktop isOpen={isGuardadosOpen} onClose={toggleGuardados} />
      </div>

      {/* Modal de "querés ser modelo?" */}
      {isModelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 opacity-95 w-full h-full  flex items-center justify-center">
            <div className="w-full lg:h-[375px] lg:flex lg:flex-row-reverse lg:max-w-[1000px]">
              {/* Botón de cerrar */}
              <div className="flex justify-center">
                <button
                  onClick={closeModelModal}
                  className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center lg:cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  cerrar
                </button>
              </div>

              {/* Contenido del modal */}
              <div className="flex-1 flex items-center justify-center px-[14px]">
                <div className="relative overflow-hidden w-full">
                  <div className=" text-black-00 lg:max-w-[700px]">
                    <p className="mb-[32px] leading-[20px] lg:text-[16px]">
                      — querés ser modelo? 
                    </p>
                    <p className="mb-[32px] leading-[20px] lg:text-[16px] lg:max-w-[420px]">
                      mandanos tus datos y dos fotos a hola@linemodels.xyz <br />
                      queremos verte natural, luz de día y sin make up, las
                      fotos las podés sacar con tu celular.
                    </p>
                    <p className="mb-[32px] leading-[20px] lg:text-[16px]">
                      nombre completo:
                      <br />
                      fecha de nacimiento:
                      <br />
                      edad:
                      <br />
                      localidad:
                      <br />
                      teléfono:
                      <br />
                      mail:
                      <br />
                      instagram:
                      <br />
                      altura:
                      <br />
                      medidas:
                    </p>
                    <p className="lg:text-[16px]">gracias —</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
