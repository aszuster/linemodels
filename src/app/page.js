import Image from "next/image";

export default function Home() {
  // Array de imágenes/rectángulos (puedes cambiar esto por datos reales)
  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    src: `/placeholder-${i + 1}.jpg`, // Ruta de imagen placeholder
    alt: `Imagen ${i + 1}`,
  }));

  return (
    <main className=" bg-white-00 pt-[200px] px-[14px]">
      <div className="w-full grid grid-cols-2 gap-[2px]">
        {images.map((image) => (
          <div key={image.id} className="w-full">
            {/* Contenedor de la imagen */}
            <div className="bg-grey-10 w-full aspect-[3/4] relative overflow-hidden">
              {/* Placeholder para la imagen */}
              <div className="absolute inset-0 flex items-center justify-center text-grey-30 text-sm">
                {image.id}
              </div>
              {/* Cuando tengas las imágenes reales, descomenta esto: */}
              {/* 
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
              />
              */}
            </div>

            {/* Información debajo de la imagen */}
            <div className="bg-white-00 p-2 flex justify-between items-end">
              <div>
                <p className="text-black-00">ana</p>
                <p className=" text-[12px]">ver medidas</p>
              </div>
              <div className="text-[12px] flex gap-[4px] items-center">
                <p>add</p>
                <p>( + )</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
