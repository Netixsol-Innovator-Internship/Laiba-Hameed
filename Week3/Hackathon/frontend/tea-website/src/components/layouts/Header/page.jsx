import { useState } from "react";
import Container from "../../shared/common/Container";
import logo from "../../../assets/header/logo.svg";
import hamburgerIcon from "../../../assets/header/hamburger.svg"; // your hamburger image
import closeIcon from "../../../assets/header/close.svg"
import { NavList, Icons } from "../../../constants/gernal";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Container>
        <header className="flex items-center justify-between my-2 px-6 sm:px-2 md:my-7 lg:px-12 w-full">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Company Logo" className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            <h1 className="text-sm sm:text-xl md:text-xl font-prosto font-normal">Brand Name</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-3 lg:gap-6">
            {Object.entries(NavList).map(([key, item]) => (
              <Link
                key={key}
                to={item.path}
                className="text-[#282828] text-xs lg:text-sm font-montserrat hover:text-black uppercase whitespace-nowrap"
              >
                {item.value}
              </Link>
            ))}
          </nav>

          {/* Side Icons + Hamburger */}
          <div className="flex items-center gap-3 sm:gap-6 lg:gap-9 flex-shrink-0">
            {/* Desktop icons */}
            {Object.entries(Icons).map(([key, icon]) => (
              <Link to={`${icon.path}`}>
                <img
                  key={key}
                  src={icon.src}
                  alt={icon.alt}
                  className="hidden md:block h-5 w-5 sm:h-6 sm:w-6"
                />
              </Link>
            ))}

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative focus:outline-none"
            >
              {isMenuOpen ? (
                <img src={closeIcon} alt="Close Menu" className="h-4 w-4 sm:h-4 sm:w-4" />
              ) : (
                <img src={hamburgerIcon} alt="Menu" className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 top-10 mt-2 w-48 md:hidden bg-gray-50 rounded shadow-md z-50 p-2 space-y-2">
              {/* Navigation links */}
              {Object.entries(NavList).map(([key, item]) => (
                <a
                  key={key}
                  href={item.path}
                  className="block text-gray-800 text-sm hover:text-black uppercase"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.value}
                </a>
              ))}

              {/* Side icons */}
              <div className="flex items-center gap-4 mt-2">
                {Object.entries(Icons).map(([key, icon]) => (
                  <img
                    key={key}
                    src={icon.src}
                    alt={icon.alt}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                ))}
              </div>
            </div>
          )}
        </header>


      </Container>
    </div>
  );
};

export default Header;
