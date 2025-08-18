import { X } from "lucide-react";
const FilterModal = ({handleClose,isVisible}) => {
    return (
        // overlay
        <div
            onClick={handleClose}
            className={`fixed inset-0 bg-[#282828]/50 flex justify-end z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* popup drawer */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[270px] sm:w-[500px] h-screen flex flex-col shadow-xl py-6 sm:py-11 px-3 sm:px-6 font-sans transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* header */}
                <div className="flex items-center justify-end gap-3 pb-6">
                    <h2 className="text-xs capitalize">SORT & FILTER </h2>
                    <button onClick={handleClose} className="cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                {/* scrollable content */}
                <div className="flex-1 overflow-y-auto">
                    {/* sortings */}
                </div>
            </div>
        </div>
    )
}

export default FilterModal