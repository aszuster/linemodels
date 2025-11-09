"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HorizontalLine from "@/svg/horizontalLine";
import Star from "@/svg/star";
import { getIaLabImages } from "@/lib/sanity-models";

export default function IaLab() {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar imágenes desde Sanity
  useEffect(() => {
    const loadImages = async () => {
      try {
        const images = await getIaLabImages();
        setGalleryImages(images);
        setLoading(false);
      } catch (error) {
        console.error("Error loading IA Lab images:", error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  // Funciones de navegación
  const goToPreviousPhoto = () => {
    if (selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const goToNextPhoto = () => {
    if (selectedPhoto < galleryImages.length - 1) {
      setSelectedPhoto(selectedPhoto + 1);
    }
  };

  // Funciones del modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Navegación con teclado
  useEffect(() => {
    if (galleryImages.length <= 1) return;

    const handleKeyPress = (e) => {
      // Solo navegar si el modal NO está abierto, o si está abierto
      if (e.key === "ArrowLeft" && selectedPhoto > 0) {
        goToPreviousPhoto();
      } else if (
        e.key === "ArrowRight" &&
        selectedPhoto < galleryImages.length - 1
      ) {
        goToNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedPhoto, galleryImages.length]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  return (
    <>
      <main className="bg-white-00 pt-[82px] lg:ml-[25%] px-[14px] pb-[80px] lg:px-[24px] lg:pt-[24px] lg:pb-0">
        <div className="pb-[32px]">
          <Link href="/" className="text-black-00 flex items-center gap-2">
            <HorizontalLine fill="#000" /> volver
          </Link>
        </div>
        <div className="lg:flex ">
          <div className="lg:block hidden w-[252px]">
            <h2 className="text-[16px] leading-[20px] lg:block hidden">
              ia lab
            </h2>
          </div>
          <div className="max-w-[1282px] lg:ml-auto pt-[24px] lg:pt-0 ">
            <div className="lg:flex lg:gap-[109px] lg:items-start">
            <h2 className="text-[16px] mb-[32px] leading-[20px] lg:hidden ">
              ia lab
            </h2>
            <Star className="mb-[32px] lg:mt-[8px] lg:w-[12px]" />
            <div className="space-y-[16px] mb-[48px] lg:flex lg:gap-[16px]">
              <p className="leading-[20px] lg:text-[16px] text-grey-40 max-w-[456px]">
                somos un estudio especializado en campañas con modelos de
                inteligencia artificial.
              </p>
              <p className="leading-[20px] lg:text-[16px] text-grey-40 max-w-[574px]">
                desarrollamos campañas publicitarias a medida con modelos y
                escenarios vivos y generados por IA. Ofrecemos soluciones
                visuales innovadoras y flexibles integrando diseño, tecnología y
                creatividad para potenciar cada proyecto.
              </p>
            </div>
            </div>

            {/* Galería de fotos */}
            {loading ? (
              <div className="mt-[48px] text-center">
                {/* <p className="text-grey-40 lg:text-[16px]">
                  Cargando imágenes...
                </p> */}
              </div>
            ) : galleryImages.length > 0 ? (
              <div className="mt-[48px]">
                {/* Foto principal */}
                <div
                  className="w-full relative bg-grey-10 mb-[16px] lg:mb-0 cursor-pointer lg:cursor-default"
                  onClick={(e) => {
                    // Solo abrir modal en móvil
                    if (window.innerWidth < 1024) {
                      openModal();
                    }
                  }}
                  style={{ minHeight: "400px" }}
                >
                  {/* Áreas clickeables para navegación en desktop */}
                  {galleryImages.length > 1 && (
                    <>
                      {/* Área izquierda - Anterior (solo desktop) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedPhoto > 0) {
                            goToPreviousPhoto();
                          }
                        }}
                        className={`hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 ${
                          selectedPhoto > 0
                            ? "cursor-[url(/arrow-left.cur),_pointer]"
                            : "cursor-default"
                        }`}
                        aria-label="Imagen anterior"
                      />

                      {/* Área derecha - Siguiente (solo desktop) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          if (selectedPhoto < galleryImages.length - 1) {
                            goToNextPhoto();
                          }
                        }}
                        className={`hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 ${
                          selectedPhoto < galleryImages.length - 1
                            ? "cursor-[url(/arrow-right.cur),_pointer]"
                            : "cursor-default"
                        }`}
                        aria-label="Imagen siguiente"
                      />
                    </>
                  )}

                  <Image
                    src={galleryImages[selectedPhoto]}
                    alt={`IA Lab - Imagen ${selectedPhoto + 1}`}
                    width={1920}
                    height={1080}
                    quality={100}
                    priority={selectedPhoto === 0}
                    className="object-contain w-full h-auto"
                  />
                </div>

                {/* Controles de navegación - Solo móvil */}
                {galleryImages.length > 1 && (
                  <div className="flex justify-between gap-4 mt-4 lg:hidden">
                    <button
                      onClick={goToPreviousPhoto}
                      disabled={selectedPhoto === 0}
                      className={`py-2 flex items-center gap-3 ${
                        selectedPhoto === 0
                          ? "text-grey-30 cursor-not-allowed"
                          : "text-black-00 hover:underline cursor-pointer"
                      }`}
                      aria-label="Imagen anterior"
                    >
                      <span>
                        <HorizontalLine
                          fill={selectedPhoto === 0 ? "#9CA3AF" : "#000"}
                        />
                      </span>
                      <span>anterior</span>
                    </button>

                    <div className="text-sm text-grey-40 flex items-center">
                      {selectedPhoto + 1} / {galleryImages.length}
                    </div>

                    <button
                      onClick={goToNextPhoto}
                      disabled={selectedPhoto === galleryImages.length - 1}
                      className={`py-2 flex items-center gap-3 ${
                        selectedPhoto === galleryImages.length - 1
                          ? "text-grey-30 cursor-not-allowed"
                          : "text-black-00 hover:underline cursor-pointer"
                      }`}
                      aria-label="Imagen siguiente"
                    >
                      <span>siguiente</span>
                      <span>
                        <HorizontalLine
                          fill={
                            selectedPhoto === galleryImages.length - 1
                              ? "#9CA3AF"
                              : "#000"
                          }
                        />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-[48px] text-center">
                <p className="text-grey-40 lg:text-[16px]">
                  No hay imágenes disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Modal de foto ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 w-full h-full flex flex-col">
            {/* Botón de cerrar */}
            <div className="flex justify-center mt-[36px] lg:absolute lg:right-[36px] z-20">
              <button
                onClick={closeModal}
                className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center lg:cursor-pointer"
                aria-label="Cerrar modal"
              >
                cerrar
              </button>
            </div>

            {/* Foto ampliada */}
            <div className="flex-1 flex items-center justify-center px-2 relative">
              {/* Área clickeable izquierda - Anterior (solo desktop) */}
              {galleryImages.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPhoto > 0) {
                      goToPreviousPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 ${
                    selectedPhoto > 0
                      ? "cursor-[url(/arrow-left.cur),_pointer] hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto anterior"
                />
              )}

              {/* Área clickeable derecha - Siguiente (solo desktop) */}
              {galleryImages.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPhoto < galleryImages.length - 1) {
                      goToNextPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 ${
                    selectedPhoto < galleryImages.length - 1
                      ? "cursor-[url(/arrow-right.cur),_pointer] hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto siguiente"
                />
              )}

              <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
                <Image
                  src={galleryImages[selectedPhoto]}
                  alt={`IA Lab - Imagen ${selectedPhoto + 1}`}
                  width={1920}
                  height={1080}
                  quality={100}
                  className="object-contain w-full h-[100vh]"
                />
              </div>
            </div>

            {/* Botones de navegación para móvil */}
            {galleryImages.length > 1 && (
              <div className="flex justify-between gap-4 p-4 lg:hidden">
                <button
                  onClick={goToPreviousPhoto}
                  disabled={selectedPhoto === 0}
                  className={`py-2 flex items-center gap-3 ${
                    selectedPhoto === 0
                      ? "text-grey-30 cursor-not-allowed"
                      : "text-black-00 hover:underline cursor-pointer"
                  }`}
                  aria-label="Imagen anterior"
                >
                  <span>
                    <HorizontalLine
                      fill={selectedPhoto === 0 ? "#9CA3AF" : "#000"}
                    />
                  </span>
                  <span>anterior</span>
                </button>

                <div className="text-sm text-grey-40 flex items-center">
                  {selectedPhoto + 1} / {galleryImages.length}
                </div>

                <button
                  onClick={goToNextPhoto}
                  disabled={selectedPhoto === galleryImages.length - 1}
                  className={`py-2 flex items-center gap-3 ${
                    selectedPhoto === galleryImages.length - 1
                      ? "text-grey-30 cursor-not-allowed"
                      : "text-black-00 hover:underline cursor-pointer"
                  }`}
                  aria-label="Imagen siguiente"
                >
                  <span>siguiente</span>
                  <span>
                    <HorizontalLine
                      fill={
                        selectedPhoto === galleryImages.length - 1
                          ? "#9CA3AF"
                          : "#000"
                      }
                    />
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
