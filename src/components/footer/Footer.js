"use client";
import { useState } from "react";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import Link from "next/link";
import Star from "@/svg/star";

const Footer = () => {
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openModelModal = () => {
    setIsModelModalOpen(true);
  };

  const closeModelModal = () => {
    setIsModelModalOpen(false);
  };
  return (
    <footer className="bg-white-00 px-[14px] pb-[24px] lg:px-[24px]">
      <div className="flex flex-col gap-[42px] lg:hidden">
        <div className="flex flex-col">
          {/* <p className="pb-[34px] flex items-center gap-[6px]"><Star /> ia lab</p> */}
          <p className="tracking-[-0.2px] leading-[16px] mb-[10px]">— contacto</p>
          <div className="text-grey-40 leading-[16px]">
            <p className="pb-[6px]">hola@linemodels.co</p>
            <p>buenos aires, argentina.</p>
          </div>

          <button
            onClick={openModelModal}
            className="tracking-[-0.3px] flex gap-[14px] items-center mt-[34px] cursor-pointer"
          >
            <p>— querés ser modelo?</p>
            <SecondaryButton>
              <span>+</span>
            </SecondaryButton>
          </button>
        </div>
        <div className="flex w-full justify-between items-center">
          <div>
            <Link href="https://www.instagram.com/line/" target="_blank">
              instagram
            </Link>
          </div>
          <SecondaryButton onClick={scrollToTop} px="14px">
            <span className="tracking-[-0.3px] leading-[16px]">
              back to top
            </span>
          </SecondaryButton>
        </div>
      </div>
      <div className="hidden lg:flex w-full justify-end items-center">
        <SecondaryButton onClick={scrollToTop} px="14px">
          <span className="tracking-[-0.3px] leading-[16px]">back to top</span>
        </SecondaryButton>
      </div>

      {/* Modal de "querés ser modelo?" */}
      {isModelModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 opacity-95 w-full h-full flex flex-col">
            {/* Botón de cerrar */}
            <div className="flex justify-center mt-[36px]">
              <button
                onClick={closeModelModal}
                className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center"
                aria-label="Cerrar modal"
              >
                cerrar
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="flex-1 flex items-center justify-center px-[14px]">
              <div className="relative overflow-hidden w-full">
                <div className=" text-black-00 ">
                  <p className="mb-[32px] leading-[20px]">
                  — querés ser modelo?
                  </p>
                  <p className="mb-[32px] leading-[20px]">
                  mandanos tus datos y dos fotos a hola@linemodels.co <br />
                  queremos verte natural, luz de día y sin make up, las fotos las podés sacar con tu celular.
                  </p>
                  <p className="mb-[32px] leading-[20px]">
                  · nombre completo: 
                    <br />
                    · fecha de nacimiento: 
                    <br />
                    · edad: 
                    <br />
                    · localidad: 
                    <br />
                    · teléfono: 
                    <br />
                    · mail: 
                    <br />
                    · instagram: 
                    <br />
                    · altura: 
                    <br />
                    · medidas: 
                  </p>
                  <p className="">gracias —</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
