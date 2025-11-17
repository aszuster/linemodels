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
  const [isPaused, setIsPaused] = useState(false);

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

  // Slideshow automático
  useEffect(() => {
    if (galleryImages.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
    }, 1500); // Cambiar cada 4 segundos

    return () => clearInterval(interval);
  }, [galleryImages.length, isPaused]);

  // Manejar cuando el mouse sale de la imagen
  const handleMouseLeave = () => {
    setIsPaused(false);
    // Cambiar inmediatamente a la siguiente imagen
    setSelectedPhoto((prev) => (prev + 1) % galleryImages.length);
  };

  // Funciones del modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
          <Link href="/" className="text-black-00 flex items-center gap-2 hover:text-grey-20 transition-all duration-300 ease-in-out">
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
              <p className="leading-[20px] lg:text-[16px] text-grey-40 lg:flex-1">
                somos un estudio especializado en campañas con modelos de
                inteligencia artificial.
              </p>
              <p className="leading-[20px] lg:text-[16px] text-grey-40 lg:flex-1">
                desarrollamos campañas publicitarias a medida con modelos y
                escenarios vivos y generados por ia. ofrecemos soluciones
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
                {/* Foto principal con crossfade */}
                <div
                  className="w-full relative mb-[16px] lg:mb-0 cursor-pointer lg:cursor-default"
                  onClick={(e) => {
                    // Solo abrir modal en móvil
                    if (window.innerWidth < 1024) {
                      openModal();
                    }
                  }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={handleMouseLeave}
                  style={{ minHeight: "400px" }}
                >
                  {galleryImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === selectedPhoto ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`IA Lab - Imagen ${index + 1}`}
                        width={1920}
                        height={1080}
                        quality={100}
                        priority={index === 0}
                        className="object-contain w-full h-auto"
                      />
                    </div>
                  ))}
                </div>

                {/* Indicador de imagen actual */}
                {galleryImages.length > 1 && (
                  <div className="text-center text-sm text-grey-40 mt-4">
                    {selectedPhoto + 1} / {galleryImages.length}
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-[48px] text-center">
                <p className="text-grey-40 lg:text-[16px]">
                  no hay imágenes disponibles en este momento.
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

            {/* Foto ampliada con crossfade */}
            <div 
              className="flex-1 flex items-center justify-center px-2 relative"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${
                      index === selectedPhoto ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`IA Lab - Imagen ${index + 1}`}
                      width={1920}
                      height={1080}
                      quality={100}
                      className="object-contain w-full h-[100vh]"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Indicador de imagen actual */}
            {galleryImages.length > 1 && (
              <div className="text-center text-sm text-grey-40 pb-4">
                {selectedPhoto + 1} / {galleryImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
