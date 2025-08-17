import React from "react";

const ProductDescription = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <h3 className="md:text-[32px] text-2xl leading-7 font-montserrat text-[#282828]">
          About this tea
        </h3>
        <div>
          <ul className="flex md:gap-11 gap-[9px] flex-wrap">
            <li>
              <h5 className="text-sm font-montserrat sm:leading-5 text-[#282828] font-medium">
                FLAVOR
              </h5>
              <p className="text-sm font-montserrat leading-5 text-[#282828]">
                Spicy
              </p>
            </li>
            <div className="border-r border-r-[#A0A0A0] "></div>
            <li>
              <h5 className="text-sm font-montserrat leading-5 text-[#282828] font-medium">
                QUALITIES
              </h5>
              <p className="text-sm font-montserrat leading-5 text-[#282828]">
                Smoothing
              </p>
            </li>
            <div className="border-r border-r-[#A0A0A0] "></div>
            <li>
              <h5 className="text-sm font-montserrat leading-5 text-[#282828] font-medium">
                CAFFEINE
              </h5>
              <p className="text-sm font-montserrat leading-5 text-[#282828] ">
                Medium
              </p>
            </li>
            <div className="border-r border-r-[#A0A0A0] "></div>
            <li>
              <h5 className="text-sm font-montserrat leading-5 text-[#282828] font-medium">
                ALLERGENS
              </h5>
              <p className="text-sm font-montserrat leading-5 text-[#282828] ">
                Nuts-free
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col gap-6">
         <h3 className="md:text-[32px] text-2xl leading-7 font-montserrat text-[#282828]">Ingredient</h3>
         <p className="text-sm leading-5">Black Ceylon tea, Green tea, Ginger root, Cloves, Black pepper, Cinnamon sticks, Cardamom, Cinnamon pieces.</p>
      </div>
    </div>
  );
};

export default ProductDescription;
