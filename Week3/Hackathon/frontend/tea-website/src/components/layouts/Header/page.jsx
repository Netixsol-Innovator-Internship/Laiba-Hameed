import { useState } from "react";
import Container from "../../shared/common/Container";
import logo from "../../../assets/header/logo.svg";
import hamburgerIcon from "../../../assets/header/hamburger.svg";
import closeIcon from "../../../assets/header/close.svg";
import { NavList, Icons } from "../../../constants/gernal";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Container>
        {/* Header - hidden when menu is open */}
        {!isMenuOpen && (
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
                <Link to={`${icon.path}`} key={key}>
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="hidden md:block h-5 w-5 sm:h-6 sm:w-6"
                  />
                </Link>
              ))}

              {/* Hamburger (mobile only) */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden relative focus:outline-none"
              >
                <img src={hamburgerIcon} alt="Menu" className="h-7 w-7 sm:h-6 sm:w-6" />
              </button>
            </div>
          </header>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed top-0 right-0 w-[267px] h-auto bg-white shadow-lg z-50 flex flex-col">
            {/* Scrollable content container */}
            <div className="overflow-y-auto flex-1 flex flex-col justify-between">
              {/* Close button + Search */}
              <div className="p-4">
                {/* Close button aligned right */}
                <div className="flex justify-end">
                  <button onClick={() => setIsMenuOpen(false)}>
                    <img src={closeIcon} alt="Close" className="h-4 w-4 sm:h-4 sm:w-4" />
                  </button>
                </div>

                {/* Search bar */}
                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="SEARCH PRODUCTS"
                    className="w-full border-[0.75px] border-[#282828] text-xs placeholder:text-[#A0A0A0] placeholder:uppercase px-3 py-2 pl-8 focus:outline-none"
                  />
                  <img className="absolute left-1 top-1/2 transform -translate-y-1/2 h-6 w-6 text-[#282828]" src={Icons.search.src} alt="" />
                </div>

                {/* Profile + Bag */}
                <div className="mt-4 space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <img src={Icons.user.src} alt="User" className="h-6 w-6" />
                    <p className="text-[11px] font-medium text-[#282828]">USER PROFILE<br /><span className="text-xs text-[#A0A0A0] font-normal">We know you as a guest user</span></p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <img src={Icons.mail.src} alt="Bag" className="h-6 w-6" />
                    <p className="text-[11px] font-medium text-[#282828]">YOUR BAG<br /><span className="text-xs text-[#A0A0A0] font-normal"><span className="text-[#C3B212]">(3)</span> items have been added</span></p>
                  </div>
                </div>

                <hr className="my-7" />

                {/* Nav Links */}
                <nav className="space-y-3">
                  {Object.entries(NavList).map(([key, item]) => (
                    <Link
                      key={key}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-sm uppercase text-gray-800 hover:text-black"
                    >
                      {item.value}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Footer area */}
              <div className="bg-[#F4F4F4] py-8 px-4 flex flex-col gap-4 mt-20">
                <div className="brand flex justify-start items-center gap-2">
                  <img src={logo} className="w-[18px] h-[18px]" alt="" />
                  <h2 className="font-medium text-[14px]">Brand Name</h2>
                </div>
                <p className="text-xs leading-4  text-[#282828]">
                  We offer loose tea leaves of the best quality for your business. 
                  With a choice of more than 450 different kinds of loose tea, 
                  we can make a sophisticated selection that fits exactly in your kind of establishment.
                </p>
                <p className="text-xs text-[#A0A0A0]">
                  ALL RIGHTS RESERVED BY Brand Name Co
                </p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Header;