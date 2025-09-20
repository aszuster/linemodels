"use client";

const SecondaryButton = ({children}) => {
  return (
  <div className="border-l-1 border-r-1 border-grey-10 px-[6px] flex items-center py-0 h-[12px]">
    {children}
  </div>
  )
};

export default SecondaryButton;
