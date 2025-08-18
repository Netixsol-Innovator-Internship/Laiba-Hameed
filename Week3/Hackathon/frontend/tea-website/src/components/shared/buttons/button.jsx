const Button = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 w-[224px] text-sm uppercase cursor-pointer font-montserrat font-medium transition-all ease-in-out duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
