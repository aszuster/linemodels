"use client";
import SecondaryButton from "../secondaryButton/SecondaryButton";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <footer className="bg-white-00 px-[14px] pb-[24px]">
        <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col">
        <p className="tracking-[-2%] mb-[8px]">contacto</p>
        <div className="text-grey-40">
          <p>hola@linemodels.co</p>
          <p>buenos aires, argentina</p>
        </div>
        <div className="tracking-[-2%] flex gap-[14px] items-center mt-[20px]">
          <p>querés ser modelo?
          </p>
          <SecondaryButton><span>+</span></SecondaryButton>
        </div>
      </div>
      <div className="flex w-full justify-between items-center">
        <div>ig: @line</div>
        <SecondaryButton onClick={scrollToTop}><span>back to top</span></SecondaryButton>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
