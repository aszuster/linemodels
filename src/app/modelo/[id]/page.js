"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getModelById } from "@/data/models";

export default function ModelPage({ params }) {
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadModel = async () => {
      try {
        const resolvedParams = await params;
        const modelData = getModelById(resolvedParams.id);
        setModel(modelData);
      } catch (error) {
        console.error('Error loading model:', error);
      } finally {
        setLoading(false);
      }
    };

    loadModel();
  }, [params]);

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
      <main className="bg-white-00 pt-[200px] px-[14px] pb-[80px]">
        <div className="text-center">
          <h1 className="text-2xl text-black-00 mb-4">Modelo no encontrado</h1>
          <Link href="/" className="text-grey-30 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white-00 pt-[200px] px-[14px] pb-[80px]">
      {/* Botón de regreso */}
      <div className="mb-8">
        <Link 
          href="/" 
          className="text-grey-30 hover:underline text-sm"
        >
          ← Volver al catálogo
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería de fotos */}
          <div className="space-y-4">
            {/* Foto principal */}
            <div className="aspect-[3/4] relative overflow-hidden bg-grey-10">
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
            <div className="grid grid-cols-4 gap-2">
              {model.photos.map((photo, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className={`aspect-square relative overflow-hidden bg-grey-10 ${
                    selectedPhoto === index ? 'ring-2 ring-black-00' : ''
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
          </div>

          {/* Información del modelo */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl text-black-00 font-normal mb-2">{model.name}</h1>
              <p className="text-grey-30">{model.age} años • {model.location}</p>
            </div>

            {/* Medidas */}
            <div className="border-l border-grey-10 pl-4">
              <h2 className="text-lg text-black-00 mb-4">Medidas</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-grey-30">Altura</p>
                  <p className="text-black-00 font-medium">{model.height}</p>
                </div>
                <div>
                  <p className="text-grey-30">Busto</p>
                  <p className="text-black-00 font-medium">{model.bust}</p>
                </div>
                <div>
                  <p className="text-grey-30">Cintura</p>
                  <p className="text-black-00 font-medium">{model.waist}</p>
                </div>
                <div>
                  <p className="text-grey-30">Cadera</p>
                  <p className="text-black-00 font-medium">{model.hips}</p>
                </div>
                <div>
                  <p className="text-grey-30">Zapatos</p>
                  <p className="text-black-00 font-medium">{model.shoes}</p>
                </div>
                <div>
                  <p className="text-grey-30">Experiencia</p>
                  <p className="text-black-00 font-medium">{model.experience}</p>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="border-l border-grey-10 pl-4">
              <h2 className="text-lg text-black-00 mb-2">Sobre {model.name}</h2>
              <p className="text-grey-30 text-sm leading-relaxed">{model.description}</p>
            </div>

            {/* Especialidades */}
            <div className="border-l border-grey-10 pl-4">
              <h2 className="text-lg text-black-00 mb-2">Especialidades</h2>
              <div className="flex flex-wrap gap-2">
                {model.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-grey-10 text-grey-30 px-3 py-1 text-xs rounded"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Disponibilidad y contacto */}
            <div className="border-l border-grey-10 pl-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-black-00">{model.availability}</span>
              </div>
              <p className="text-sm text-grey-30">Contacto: {model.contact}</p>
            </div>

            {/* Botones de acción */}
            <div className="flex gap-4 pt-4">
              <button className="bg-black-00 text-white-00 px-6 py-2 text-sm hover:bg-grey-40 transition-colors">
                Contactar
              </button>
              <button className="border border-grey-10 text-black-00 px-6 py-2 text-sm hover:bg-grey-10 transition-colors">
                Agregar a favoritos
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
