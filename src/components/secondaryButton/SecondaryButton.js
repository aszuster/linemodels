"use client";

const SecondaryButton = ({children, onClick, className = "", px="6px"}) => {
  return (
  <div 
    className={`border-l-1 border-r-1 border-grey-10 flex items-center py-0 h-[12px] ${onClick ? 'cursor-pointer hover:opacity-70 transition-opacity' : ''} ${className}`}
    style={{ paddingLeft: px, paddingRight: px }}
    onClick={onClick}
  >
    {children}
  </div>
  )
};

export default SecondaryButton;
