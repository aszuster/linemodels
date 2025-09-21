"use client";

const SecondaryButton = ({children, onClick, className = ""}) => {
  return (
  <div 
    className={`border-l-1 border-r-1 border-grey-10 px-[6px] flex items-center py-0 h-[12px] ${onClick ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
  )
};

export default SecondaryButton;
