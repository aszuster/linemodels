"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import SecondaryButton from "../secondaryButton/SecondaryButton";
import Link from "next/link";
import Star from "@/svg/star";
import Image from "next/image";

const Footer = () => {
  const [isModelModalOpen, setIsModelModalOpen] = useState(false);
  const pathname = usePathname();
  const isIaLabPage = pathname === "/ia-lab";
  const isSerModeloPage = pathname === "/ser-modelo";

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
    <footer className="bg-white-00 px-[14px] pb-[24px] lg:px-[24px] mt-auto">
      <div className="flex flex-col gap-[42px] lg:hidden">
        <div className="flex flex-col">
          <Link href="/ia-lab" className="pb-[34px] flex items-center gap-[6px]"><Star /> ia lab</Link>
          <p className="tracking-[-0.2px] leading-[16px] mb-[10px]">— contacto</p>
          <div className="text-grey-40 leading-[16px]">
            <p className="pb-[6px]">hola@linemodels.xyz</p>
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
            <Link href="https://www.instagram.com/linemodels__/" target="_blank">
              instagram
            </Link>
          </div>
          {!isSerModeloPage && (
            <SecondaryButton onClick={scrollToTop} px="14px">
              <span className="tracking-[-0.3px] leading-[16px]">
                back to top
              </span>
            </SecondaryButton>
          )}
        </div>
      </div>
      {!isIaLabPage && !isSerModeloPage && (
        <div className="hidden lg:flex w-full justify-end items-center">
          <SecondaryButton onClick={scrollToTop} px="14px">
            <span className="tracking-[-0.3px] leading-[16px]">back to top</span>
          </SecondaryButton>
        </div>
      )}

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
                <div className="w-full pb-[32px]">
                  <div className="flex justify-between items-center text-[6px]">
                    <span>01</span>
                    <span>03</span>
                  </div>
                <Image src="/queres-ser-modelo.png" alt="logo" width={386} height={244} className="w-full h-auto py-[10px]" />
                <div className="flex justify-between items-center text-[6px]">
                    <span>02</span>
                    <span>04</span>
                  </div>
                </div>
                <div className=" text-black-00 ">
                  <p className="mb-[32px] leading-[20px]">
                  — querés ser modelo?
                  </p>
                  <p className="mb-[32px] leading-[20px]">
                  mandanos tus datos y dos fotos a hola@linemodels.xyz <br />
                  queremos verte natural, luz de día y sin make up, las fotos las podés sacar con tu celular.
                  </p>
                  <div className="mb-[32px] leading-[20px] flex flex-col">
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(01)</span><p>nombre completo</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(02)</span><p>fecha de nacimiento</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(03)</span><p>edad</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(04)</span><p>localidad</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(05)</span><p>teléfono</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(06)</span><p>mail</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(07)</span><p>instagram</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(08)</span><p>altura</p>
                    </div>
                    <div className="flex items-center">
                  <span className="text-[9px] pr-[12px]">(09)</span><p>medidas</p>
                    </div>

                  </div>
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
