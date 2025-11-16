"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SerModelo() {
  const router = useRouter();

  return (
    <div className="h-screen bg-white-00 text-black-00 lg:pl-[25%] lg:pr-[24px] px-[20px] pt-[80px] lg:pt-[36px] flex items-start justify-center pb-[95px]">
      <div className="w-full h-full">
        {/* Botón de cerrar - Solo Desktop */}

        {/* Contenido del modal */}
        <div className="flex items-center h-full">
          <div className="relative overflow-hidden w-full h-full">
            <div className="text-black-00 flex flex-col justify-between h-full">
              <div className="w-full flex flex-col lg:flex-row justify-between items-start gap-[32px]">
                <div className="w-full lg:w-auto">
                  <p className="mb-[32px] leading-[20px] lg:text-[16px]">
                    — querés ser modelo?
                  </p>
                  <p className="mb-[32px] leading-[20px] lg:text-[16px] lg:max-w-[489px] lg:mb-[56px]">
                    mandanos tus datos y dos fotos a hola@linemodels.xyz <br />
                    queremos verte natural, luz de día y sin make up, las fotos
                    las podés sacar con tu celular.
                  </p>
                  <div className="mb-[32px] leading-[20px] flex flex-col">
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(01)</span>
                      <p>nombre completo</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(02)</span>
                      <p>fecha de nacimiento</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(03)</span>
                      <p>edad</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(04)</span>
                      <p>localidad</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(05)</span>
                      <p>teléfono</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(06)</span>
                      <p>mail</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(07)</span>
                      <p>instagram</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(08)</span>
                      <p>altura</p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[9px] pr-[12px]">(09)</span>
                      <p>medidas</p>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-auto pb-[32px] flex">
                  <div className="flex flex-col justify-between items-center text-[6px] pr-[6px]">
                    <span>01</span>
                    <span>03</span>
                  </div>
                  <Image
                    src="/queres-ser-modelo.png"
                    alt="logo"
                    width={554}
                    height={350}
                    className=" h-auto w-[544px]"
                  />
                  <div className="flex flex-col justify-between items-center text-[6px] pl-[6px]">
                    <span>02</span>
                    <span>04</span>
                  </div>
                  <div className="hidden lg:flex justify-center mb-[20px] lg:mb-0 lg:ml-[50px]">
                    <button
                      onClick={() => router.back()}
                      className="text-black-00 border-x border-grey-10 px-[15px] h-[18px] flex items-center cursor-pointer hover:underline"
                      aria-label="Cerrar"
                    >
                      cerrar
                    </button>
                  </div>
                </div>
              </div>
              <div className="grid grid-rows-2 pr-[130px] items-end h-full" style={{ gridTemplateColumns: '1fr 556px 6px' }}>

                <div className="">
                  <p className="lg:text-[6px]">02</p>
                </div>
                <div className="">
                  <p className="lg:text-[6px]">03</p>
                </div>
                <div className="">
                  <p className="lg:text-[6px]">03</p>
                </div>
                <div className="">
                  <p className="lg:text-[16px]">gracias —</p>
                </div>
                <div className="">
                  <p className="lg:text-[6px]">04</p>
                </div>
                <div className="">
                  <p className="lg:text-[6px]">04</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
