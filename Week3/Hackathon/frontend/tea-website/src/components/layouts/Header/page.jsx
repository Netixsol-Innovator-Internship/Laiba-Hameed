import { useState } from "react";
import Container from "../../shared/common/Container";
import logo from "../../../assets/header/logo.svg";
import hamburgerIcon from "../../../assets/header/hamburger.svg"; // your hamburger image
import { NavList, Icons } from "../../../constants/gernal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Container>
        <header className="flex items-center justify-between my-7 px-6 sm:px-10 lg:px-12">
          {/* Logo area */}
          <div className="log gap-1 sm:gap-2 flex justify-center items-center flex-shrink-0">
            <img
              src={logo}
              alt="Company Logo"
              className="h-8 w-8 sm:h-10 sm:w-10 md:h-[48px] md:w-[48px]"
            />
            <h1 className="text-sm text-[#282828] sm:text-xl font-prosto font-normal md:text-xl xs:block">
              Brand Name
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="navItems hidden md:flex gap-3 lg:gap-6">
            {Object.entries(NavList).map(([key, item]) => (
              <a
                key={key}
                href={item.path}
                className="text-[#282828] text-xs lg:text-sm font-montserrat  hover:text-black uppercase whitespace-nowrap"
              >
                {item.value}
              </a>
            ))}
          </div>

          {/* Side icons */}
          <div className="sideIcons flex gap-3 sm:gap-6 lg:gap-9 items-center justify-center flex-shrink-0">
                    {Object.entries(Icons).map(([key, icon]) => (
                      <img 
                        key={key} 
                        src={icon.src} 
                        alt={icon.alt} 
                        className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6"
                      />
                    ))}


            {/* Hamburger button (mobile only) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden focus:outline-none"
            >
              <img
                src={hamburgerIcon}
                alt="Menu"
                className="h-5 w-5 sm:h-6 sm:w-6"
              />
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden  p-4 space-y-2 bg-gray-50 rounded-lg shadow-md">
            {Object.entries(NavList).map(([key, item]) => (
              <a
                key={key}
                href={item.path}
                className="block text-[#282828] text-[10px] hover:text-black uppercase"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.value}
              </a>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;
