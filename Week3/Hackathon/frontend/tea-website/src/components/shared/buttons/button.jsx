import React from "react";

const Button = ({ children, variant = "black", className = "", ...props }) => {
  // Define styles for different variants
  const baseStyles = "py-[10px] w-[281px] font-medium transition-colors duration-200";
  const variants = {
    black: "bg-[#282828] text-white hover:bg-gray-800",
    white: "bg-white text-black border border-gray-300 hover:bg-gray-100",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
