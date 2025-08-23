const Button = ({ children, className = "", onClick, disabled = false }) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`px-6 py-3 w-[224px] text-sm uppercase font-montserrat font-medium transition-all ease-in-out duration-300 
        ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"} 
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
