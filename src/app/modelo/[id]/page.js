"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getModelById } from "@/data/models";
import HorizontalLine from "@/svg/horizontalLine";
import { useGuardados } from "@/context/GuardadosContext";

export default function ModelPage({ params }) {
  const { addToGuardados } = useGuardados();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToGuardados = (e, name) => {
    e.preventDefault(); // Prevenir navegación del Link
    e.stopPropagation(); // Prevenir que se active el Link padre
    addToGuardados(name);
  };

  // Funciones de navegación de la galería
  const goToPreviousPhoto = () => {
    if (selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1);
    }
  };

  const goToNextPhoto = () => {
    if (selectedPhoto < model.photos.length - 1) {
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

  useEffect(() => {
    setIsClient(true);
    const loadModel = async () => {
      try {
        const resolvedParams = await params;
        const modelData = getModelById(resolvedParams.id);
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
    if (!model || model.photos.length <= 1) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" && selectedPhoto > 0) {
        goToPreviousPhoto();
      } else if (
        e.key === "ArrowRight" &&
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
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen]);

  if (loading || !isClient) {
    return (
      <main className="bg-white-00 pt-[200px] px-[14px] pb-[80px]">
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-grey-10 rounded mb-4 mx-auto w-64"></div>
            <div className="h-4 bg-grey-10 rounded mx-auto w-32"></div>
          </div>
        </div>
      </main>
    );
  }

  if (!model) {
    return (
      <main className="bg-white-00 pt-[32px] px-[14px] pb-[80px]">
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
    <main className="bg-white-00 pt-[80px] px-[14px] pb-[80px]">
      {/* Botón de regreso */}
      <div className="mb-8 ">
        <Link href="/" className="text-black-00 flex items-center gap-2">
          <HorizontalLine fill="#000" /> volver
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Información */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-[20px] pb-[4px]">{model.name}</h3>
              <div
                className="text-[12px] flex gap-[4px] items-center cursor-pointer"
                onClick={(e) => handleAddToGuardados(e, model.name)}
              >
                <p>add</p>
                <p>( + )</p>
              </div>
            </div>
            <div className="flex gap-[32px]">
              <div>
                <p className="text-[12px] text-grey-20">altura: </p>
                <p className="text-[12px] text-grey-20">busto:</p>
                <p className="text-[12px] text-grey-20">cintura:</p>
                <p className="text-[12px] text-grey-20">cadera:</p>
                <p className="text-[12px] text-grey-20">zapatos:</p>
              </div>
              <div>
                <p className="text-[12px] ">{model.height}</p>
                <p className="text-[12px] ">{model.bust}</p>
                <p className="text-[12px] ">{model.waist}</p>
                <p className="text-[12px] ">{model.hips}</p>
                <p className="text-[12px] ">{model.shoes}</p>
              </div>
            </div>
          </div>
          {/* Galería de fotos */}
          <div className="space-y-4">
            <p className="mb-[48px]">polas</p>
            {/* Foto principal */}
            <div
              className="aspect-[3/4] relative overflow-hidden bg-grey-10 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={openModal}
            >
              <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-lg">
                {model.name} - Foto {selectedPhoto + 1}
              </div>
              {/* Cuando tengas las imágenes reales, descomenta esto: */}
              {/* 
              <Image
                src={model.photos[selectedPhoto]}
                alt={`${model.name} - Foto ${selectedPhoto + 1}`}
                fill
                className="object-cover"
              />
              */}
            </div>

            {/* Miniaturas */}
            <div className="grid grid-cols-6 gap-2">
              {model.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className={`aspect-square relative overflow-hidden bg-grey-10 transition-all ${
                    selectedPhoto === index ? "" : "hover:scale-105"
                  }`}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-xs">
                    {index + 1}
                  </div>
                  {/* Cuando tengas las imágenes reales, descomenta esto: */}
                  {/* 
                    <Image
                      src={photo}
                      alt={`${model.name} - Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    */}
                </button>
              ))}
            </div>

            {/* Botones de navegación */}
            {model.photos.length > 1 && (
              <div className="flex justify-between gap-4 mt-4">
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
                  disabled={selectedPhoto === model.photos.length - 1}
                  className={`py-2 flex items-center gap-3 ${
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
        </div>
      </div>

      {/* Modal de foto ampliada */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white-00 w-full h-full flex flex-col">
            {/* Botón de cerrar */}
            <div className="flex justify-center mt-[36px]">
              <button
                onClick={closeModal}
                className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center"
                aria-label="Cerrar modal"
              >
                cerrar
              </button>
            </div>

            {/* Foto ampliada */}
            <div className="flex-1 flex items-center justify-center px-2">
              <div className="aspect-[3/4] relative overflow-hidden bg-grey-10 w-full max-w-4xl">
                <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-lg">
                  {model.name} - Foto {selectedPhoto + 1}
                </div>
                {/* Cuando tengas las imágenes reales, descomenta esto: */}
                {/* 
                <Image
                  src={model.photos[selectedPhoto]}
                  alt={`${model.name} - Foto ${selectedPhoto + 1}`}
                  fill
                  className="object-cover"
                />
                */}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
