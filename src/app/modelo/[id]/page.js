"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getModelDataById } from "@/lib/sanity-models";
import HorizontalLine from "@/svg/horizontalLine";
import { useGuardados } from "@/context/GuardadosContext";
import {
  useStaggeredImageAnimation,
  useProgressiveImageAnimation,
} from "@/hooks/useStaggeredImageAnimation";

export default function ModelPage({ params }) {
  const { toggleGuardado, isInGuardados } = useGuardados();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedBookPhoto, setSelectedBookPhoto] = useState(0);
  const mainPhotoRef = useRef(null);
  const [mainPhotoHeight, setMainPhotoHeight] = useState(0);

  // Hook para animación escalonada de miniaturas de polas
  const { containerRef: polasContainerRef, visibleItems: polasVisibleItems } =
    useStaggeredImageAnimation(
      model?.photos || [],
      150 // 150ms de delay entre cada miniatura
    );

  // Hook para animación progresiva de imágenes del book (aparecen al hacer scroll)
  const {
    visibleItems: bookVisibleItems,
    registerElement: registerBookElement,
  } = useProgressiveImageAnimation(
    model?.book || [],
    150 // 150ms de delay entre cada imagen del book
  );

  // Estado para controlar la aparición de la foto principal de polas
  const [isMainPhotoVisible, setIsMainPhotoVisible] = useState(false);

  // Efecto para mostrar la foto principal con delay
  useEffect(() => {
    if (model?.photos && model.photos.length > 0) {
      const timer = setTimeout(() => {
        setIsMainPhotoVisible(true);
      }, 300); // Aparece después de 300ms

      return () => clearTimeout(timer);
    }
  }, [model?.photos]);

  const handleToggleGuardado = (e, model) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation(); // Prevenir que se active el Link padre
    toggleGuardado(model);
  };

  // Funciones de navegación de la galería
  const goToPreviousPhoto = () => {
    if (selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const goToNextPhoto = () => {
    if (model.photos && selectedPhoto < model.photos.length - 1) {
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

  // Funciones del modal del book
  const openBookModal = (index) => {
    setSelectedBookPhoto(index);
    setIsBookModalOpen(true);
  };

  const closeBookModal = () => {
    setIsBookModalOpen(false);
  };

  // Funciones de navegación del book modal
  const goToPreviousBookPhoto = () => {
    if (selectedBookPhoto > 0) {
      setSelectedBookPhoto(selectedBookPhoto - 1);
    }
  };

  const goToNextBookPhoto = () => {
    if (model.book && selectedBookPhoto < model.book.length - 1) {
      setSelectedBookPhoto(selectedBookPhoto + 1);
    }
  };

  useEffect(() => {
    setIsClient(true);
    const loadModel = async () => {
      try {
        const resolvedParams = await params;
        const modelData = await getModelDataById(resolvedParams.id);
        setModel(modelData);
      } catch (error) {
        console.error("Error loading model:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [params]);

  // Navegación con teclado
  useEffect(() => {
    if (!model || !model.photos || model.photos.length <= 1) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && selectedPhoto > 0) {
        goToPreviousPhoto();
      } else if (
        e.key === "ArrowRight" &&
        model.photos &&
        selectedPhoto < model.photos.length - 1
      ) {
        goToNextPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [model, selectedPhoto]);

  // Cerrar modal con Escape
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      } else if (e.key === "Escape" && isBookModalOpen) {
        closeBookModal();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, isBookModalOpen]);

  // Navegación con teclado para book modal
  useEffect(() => {
    if (!model || !model.book || model.book.length <= 1 || !isBookModalOpen)
      return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && selectedBookPhoto > 0) {
        goToPreviousBookPhoto();
      } else if (
        e.key === "ArrowRight" &&
        model.book &&
        selectedBookPhoto < model.book.length - 1
      ) {
        goToNextBookPhoto();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [model, selectedBookPhoto, isBookModalOpen]);

  // Calcular altura de la foto principal para las miniaturas
  useEffect(() => {
    const updateHeight = () => {
      if (mainPhotoRef.current && window.innerWidth >= 1025) {
        const height = mainPhotoRef.current.offsetHeight;
        setMainPhotoHeight(height);
      } else {
        setMainPhotoHeight(0);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    
    // Esperar a que la imagen cargue
    const timer = setTimeout(updateHeight, 500);
    
    return () => {
      window.removeEventListener('resize', updateHeight);
      clearTimeout(timer);
    };
  }, [model, isMainPhotoVisible]);

  if (loading || !isClient) {
    return (
      <main className="bg-white-00 pt-[200px] lg:pt-0 lg:ml-[25%] px-[14px] pb-[80px]">

      </main>
    );
  }

  if (!model) {
    return (
      <main className="bg-white-00 pt-[32px] lg:pt-0 lg:ml-[25%] px-[14px] pb-[80px]">
        <div className="text-center">
          <h1 className="text-2xl text-black-00 mb-4">Modelo no encontrado</h1>
          <Link href="/" className="text-grey-30 hover:underline">
            volver
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white-00 pt-[80px] lg:ml-[25%] px-[14px] pb-[80px] lg:pt-[24px] lg:px-[24px]">
      {/* Botón de regreso */}
      <div className="mb-8 lg:mb-0">
        <Link href="/" className="text-black-00 flex items-center gap-2">
          <HorizontalLine fill="#000" /> volver
        </Link>
      </div>

      <div className="max-w-6xl mx-auto lg:max-w-full">
        <div>
          <div className="lg:flex lg:items-start">
            {/* Información */}
            <div className="flex justify-between lg:flex-col lg:w-1/4 lg:pt-[160px] lg:gap-[121px]">
              <div>
                <h3 className="text-[20px] pb-[4px]">
                  {model.name} {model.lastName}
                </h3>
                {model.instagram && (
                  <div  className="text-[12px] mb-[16px] lg:text-[16px] lg:mb-[24px]">
                    <Link
                     
                      href={`https://instagram.com/${model.instagram}`}
                      target="_blank"
                    >
                      @{model.instagram}
                    </Link>
                  </div>
                )}
                <div
                  className="text-[12px] lg:text-[16px] flex gap-[4px] items-center cursor-pointer"
                  onClick={(e) => handleToggleGuardado(e, model)}
                >
                  <p>{isInGuardados(model.id) ? "added" : "add"}</p>
                  <p>{isInGuardados(model.id) ? "( - )" : "( + )"}</p>
                </div>
              </div>
              <div className="flex gap-[32px]">
                <div>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    altura
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    busto
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    cintura
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    cadera
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    zapatos
                  </p>
                  {/* {model.instagram && (
                  <p className="text-[12px] lg:text-[14px] text-grey-40">instagram</p>
                )} */}
                </div>
                <div>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    {model.height} cm
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    {model.bust} cm
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    {model.waist} cm
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    {model.hips} cm
                  </p>
                  <p className="text-[12px] lg:text-[14px] leading-[14px] lg:leading-[16px] text-grey-40">
                    {model.shoes}
                  </p>
                  {/* {model.instagram && (
                  <a 
                    href={`https://instagram.com/${model.instagram}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[12px] lg:text-[14px] text-grey-40 hover:text-black transition-colors duration-200 break-all"
                  >
                    https://instagram.com/{model.instagram}
                  </a>
                )} */}
                </div>
              </div>
            </div>
            {/* Galería de fotos */}
            {model.photos && model.photos.length > 0 && (
              <div className="space-y-4 mt-[48px] lg:w-3/4 lg:relative lg:mr-auto lg:mt-[160px]">
                <p className="mb-[48px] lg:hidden">polas</p>
                <div className="lg:flex lg:justify-end">
                  {/* Título para desktop */}
                  <p className="hidden lg:block lg:text-right lg:writing-mode-vertical-rl lg:self-start mr-[135px]">
                    polas
                  </p>
                  {/* Foto principal */}
                  <div
                    ref={mainPhotoRef}
                    className={`aspect-[3/4] relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity mb-[8px] lg:mb-0 lg:flex-1 lg:overflow-visible lg:max-w-[700px] fade-in-stagger ${
                      isMainPhotoVisible ? "visible" : ""
                    }`}
                    onClick={openModal}
                  >
                    {/* <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-lg">
                      {model.name} - Foto {selectedPhoto + 1}
                    </div> */}
                    {/* Cuando tengas las imágenes reales, descomenta esto: */}

                    <Image
                      src={model.photos[selectedPhoto]}
                      alt={`${model.name} - Foto ${selectedPhoto + 1}`}
                      fill
                      quality={100}
                      priority={selectedPhoto === 0}
                      className="object-cover"
                    />

                    {/* botones de navegación solo desktop */}
                    <div className="hidden lg:flex justify-between gap-4 mt-4 lg:absolute lg:bottom-[-50px] lg:left-0 lg:right-0 lg:w-full">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPreviousPhoto();
                        }}
                        disabled={selectedPhoto === 0}
                        className={`py-2 flex items-center gap-3 ${
                          selectedPhoto === 0
                            ? "text-grey-30 cursor-not-allowed"
                            : "text-black-00 hover:underline cursor-pointer"
                        }`}
                        aria-label="Foto anterior"
                      >
                        <span>
                          <HorizontalLine
                            fill={selectedPhoto === 0 ? "#9CA3AF" : "#000"}
                          />
                        </span>
                        <span className="lg:text-[16px]">anterior</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextPhoto();
                        }}
                        disabled={
                          model.photos &&
                          selectedPhoto === model.photos.length - 1
                        }
                        className={`py-2 flex items-center gap-3 ${
                          model.photos &&
                          selectedPhoto === model.photos.length - 1
                            ? "text-grey-30 cursor-not-allowed"
                            : "text-black-00 hover:underline cursor-pointer"
                        }`}
                        aria-label="Foto siguiente"
                      >
                        <span className="lg:text-[16px]">siguiente</span>
                        <span>
                          <HorizontalLine
                            fill={
                              model.photos &&
                              selectedPhoto === model.photos.length - 1
                                ? "#9CA3AF"
                                : "#000"
                            }
                          />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Miniaturas */}
                  <div
                    ref={polasContainerRef}
                    className="flex gap-[2px] overflow-x-auto scrollbar-hide lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:gap-[2px] lg:w-[102px] lg:ml-[2px]"
                    style={{ maxHeight: mainPhotoHeight > 0 ? `${mainPhotoHeight}px` : 'none' }}
                  >
                    {model.photos.map((photo, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedPhoto(index)}
                        className={`aspect-[3/4] relative overflow-hidden transition-all fade-in-stagger flex-shrink-0 w-[calc((100vw-28px-10px)/6)] lg:w-full ${
                          polasVisibleItems.has(index) ? "visible" : ""
                        } ${
                          selectedPhoto === index
                            ? ""
                            : "hover:opacity-70 cursor-pointer"
                        }`}
                      >
                        {/* <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-xs">
                          {index + 1}
                        </div> */}
                        {/* Cuando tengas las imágenes reales, descomenta esto: */}

                        <Image
                          src={photo}
                          alt={`${model.name} - Miniatura ${index + 1}`}
                          fill
                          quality={100}
                          sizes="(max-width: 1024px) 16vw, 102px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Botones de navegación */}
                {model.photos && model.photos.length > 1 && (
                  <div className="flex justify-between gap-4 mt-4 lg:hidden">
                    <button
                      onClick={goToPreviousPhoto}
                      disabled={selectedPhoto === 0}
                      className={`py-2 flex items-center gap-3 ${
                        selectedPhoto === 0
                          ? "text-grey-30 cursor-not-allowed"
                          : "text-black-00 hover:underline cursor-pointer"
                      }`}
                      aria-label="Foto anterior"
                    >
                      <span>
                        <HorizontalLine
                          fill={selectedPhoto === 0 ? "#9CA3AF" : "#000"}
                        />
                      </span>
                      <span>anterior</span>
                    </button>

                    <button
                      onClick={goToNextPhoto}
                      disabled={
                        model.photos &&
                        selectedPhoto === model.photos.length - 1
                      }
                      className={`py-2 flex items-center gap-3 ${
                        model.photos &&
                        selectedPhoto === model.photos.length - 1
                          ? "text-grey-30 cursor-not-allowed"
                          : "text-black-00 hover:underline cursor-pointer"
                      }`}
                      aria-label="Foto siguiente"
                    >
                      <span>siguiente</span>
                      <span>
                        <HorizontalLine
                          fill={
                            model.photos &&
                            selectedPhoto === model.photos.length - 1
                              ? "#9CA3AF"
                              : "#000"
                          }
                        />
                      </span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* book component */}
          {model.book && model.book.length > 0 && (
            <div className="mt-[48px] lg:mt-[144px]">
              <p className="mb-[48px] lg:mb-[80px]">book</p>
              <div className="grid grid-cols-2 gap-x-[2px] gap-y-[16px] lg:gap-y-[32px]">
                {(() => {
                  // Función para procesar las fotos y agregar placeholders
                  const processedPhotos = [];
                  let currentRow = 0;
                  let currentCol = 0;

                  model.book.forEach((photo, index) => {
                    if (photo.orientation === "horizontal") {
                      // Si hay una columna ocupada en la fila actual, agregar placeholder
                      if (currentCol === 1) {
                        processedPhotos.push({
                          type: "placeholder",
                          key: `placeholder-${index}-1`,
                          className: "col-span-1 aspect-[3/4]",
                        });
                      }
                      // Agregar la foto horizontal
                      processedPhotos.push({
                        type: "photo",
                        data: photo,
                        key: index,
                        className: "col-span-2 aspect-[3/2]",
                      });
                      currentRow++;
                      currentCol = 0;
                    } else {
                      // Foto vertical
                      processedPhotos.push({
                        type: "photo",
                        data: photo,
                        key: index,
                        className: "col-span-1 aspect-[3/4]",
                      });
                      currentCol++;
                      if (currentCol === 2) {
                        currentRow++;
                        currentCol = 0;
                      }
                    }
                  });

                  // Si la última fila tiene solo una columna ocupada, agregar placeholder
                  // if (currentCol === 1) {
                  //   processedPhotos.push({
                  //     type: 'placeholder',
                  //     key: `placeholder-end`,
                  //     className: "col-span-1 aspect-[3/4]"
                  //   });
                  // }

                  return processedPhotos.map((item, index) => (
                    <div
                      key={item.key}
                      ref={(el) => registerBookElement(index, el)}
                      className={` relative fade-in-stagger ${
                        bookVisibleItems.has(index) ? "visible" : ""
                      } ${item.className} ${
                        item.type === "photo"
                          ? "cursor-pointer hover:opacity-90 transition-opacity"
                          : ""
                      }`}
                      onClick={
                        item.type === "photo"
                          ? () => openBookModal(index)
                          : undefined
                      }
                    >
                      {item.type === "placeholder" ? (
                        <img
                          src="/empty.webp"
                          alt="Empty placeholder"
                          className="w-full h-full bg-white-00 "
                        />
                      ) : (
                        item.data.image && (
                          <Image
                            src={item.data.image}
                            alt="Book photo"
                            fill
                            quality={100}
                            loading="lazy"
                            className="object-cover"
                          />
                        )
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de foto ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 w-full h-full flex flex-col">
            {/* Botón de cerrar */}
            <div className="flex justify-center mt-[36px] lg:absolute  lg:right-[36px] z-20">
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
              {model.photos && model.photos.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPhoto > 0) {
                      goToPreviousPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 ${
                    selectedPhoto > 0
                      ? "cursor-[url(/arrow-left.cur),_pointer]  hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto anterior"
                />
              )}

              {/* Área clickeable derecha - Siguiente (solo desktop) */}
              {model.photos && model.photos.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedPhoto < model.photos.length - 1) {
                      goToNextPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 ${
                    selectedPhoto < model.photos.length - 1
                      ? "cursor-[url(/arrow-right.cur),_pointer]  hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto siguiente"
                />
              )}

              <div className="relative w-full h-full max-w-4xl max-h-full lg:max-w-[700px] flex items-center justify-center">
                {/* <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-lg">
                  {model.name} - Foto {selectedPhoto + 1}
                </div> */}
                {/* Cuando tengas las imágenes reales, descomenta esto: */}

                <Image
                  src={model.photos[selectedPhoto]}
                  alt={`${model.name} - Foto ${selectedPhoto + 1}`}
                  width={700}
                  height={933}
                  quality={100}
                  className="object-contain w-full h-[100vh]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de foto ampliada del book */}
      {isBookModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 w-full h-full flex flex-col">
            {/* Botón de cerrar */}
            <div className="flex justify-center mt-[36px] lg:absolute lg:right-[36px] z-20">
              <button
                onClick={closeBookModal}
                className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center lg:cursor-pointer"
                aria-label="Cerrar modal"
              >
                cerrar
              </button>
            </div>

            {/* Foto ampliada */}
            <div className="flex-1 flex items-center justify-center px-2 relative">
              {/* Área clickeable izquierda - Anterior (solo desktop) */}
              {model.book && model.book.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedBookPhoto > 0) {
                      goToPreviousBookPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute left-0 top-0 w-1/2 h-full z-10 ${
                    selectedBookPhoto > 0
                      ? "cursor-[url(/arrow-left.cur),_pointer] hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto anterior"
                />
              )}

              {/* Área clickeable derecha - Siguiente (solo desktop) */}
              {model.book && model.book.length > 1 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedBookPhoto < model.book.length - 1) {
                      goToNextBookPhoto();
                    }
                  }}
                  className={`hidden lg:block absolute right-0 top-0 w-1/2 h-full z-10 ${
                    selectedBookPhoto < model.book.length - 1
                      ? "cursor-[url(/arrow-right.cur),_pointer] hover:bg-opacity-5 transition-colors"
                      : "cursor-default"
                  }`}
                  aria-label="Área para ir a la foto siguiente"
                />
              )}

              <div className="relative w-full h-full max-w-4xl max-h-full lg:max-w-[700px] flex items-center justify-center">
                {/* <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-lg">
                  {model.name} - Book {selectedBookPhoto + 1}
                </div> */}
                {/* Cuando tengas las imágenes reales, descomenta esto: */}

                {model.book[selectedBookPhoto]?.image && (
                  <Image
                    src={model.book[selectedBookPhoto].image}
                    alt={`${model.name} - Book ${selectedBookPhoto + 1}`}
                    width={model.book[selectedBookPhoto]?.orientation === "horizontal" ? 700 : 700}
                    height={model.book[selectedBookPhoto]?.orientation === "horizontal" ? 467 : 933}
                    quality={100}
                    className="object-contain w-full h-[100vh]"
                  />
                )}
              </div>
            </div>

            {/* Botones de navegación para móvil */}
            {model.book && model.book.length > 1 && (
              <div className="flex justify-between gap-4 p-4 lg:hidden">
                <button
                  onClick={goToPreviousBookPhoto}
                  disabled={selectedBookPhoto === 0}
                  className={`py-2 flex items-center gap-3 ${
                    selectedBookPhoto === 0
                      ? "text-grey-30 cursor-not-allowed"
                      : "text-black-00 hover:underline cursor-pointer"
                  }`}
                  aria-label="Foto anterior"
                >
                  <span>
                    <HorizontalLine
                      fill={selectedBookPhoto === 0 ? "#9CA3AF" : "#000"}
                    />
                  </span>
                  <span>anterior</span>
                </button>

                <button
                  onClick={goToNextBookPhoto}
                  disabled={selectedBookPhoto === model.book.length - 1}
                  className={`py-2 flex items-center gap-3 ${
                    selectedBookPhoto === model.book.length - 1
                      ? "text-grey-30 cursor-not-allowed"
                      : "text-black-00 hover:underline cursor-pointer"
                  }`}
                  aria-label="Foto siguiente"
                >
                  <span>siguiente</span>
                  <span>
                    <HorizontalLine
                      fill={
                        selectedBookPhoto === model.book.length - 1
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
    </main>
  );
}
