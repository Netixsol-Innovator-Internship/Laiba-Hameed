import { Minus, Plus, X } from "lucide-react"
import { products } from "../../../constants/gernal"
import { useEffect, useState } from "react"
import Button from "../buttons/button"

const CartPopup = ({ onClose }) => {
    const [isVisible, setIsVisible] = useState(false)

    // Animate in when mounted
    useEffect(() => {
        setIsVisible(true)
    }, [])

    // Close on ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose()
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    const handleClose = () => {
        setIsVisible(false)
        setTimeout(() => onClose(), 300) // match transition duration
    }

    return (
        // overlay
        <div
            onClick={handleClose}
            className={`fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-end z-50 transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* popup drawer */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white w-[261px] sm:w-[500px] h-screen flex flex-col shadow-xl py-6 sm:py-11 px-3 sm:px-6 font-sans transform transition-transform duration-300 ${isVisible ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* cart items */}
                <div className="flex-1 flex flex-col min-h-0">
                    <div className="flex items-center justify-between pb-6">
                        <h2 className="text-xl capitalize">my bag</h2>
                        <button onClick={handleClose} className="cursor-pointer">
                            <X />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {products.map((product) => (
                            <div key={product.id} className="flex items-center gap-2 sm:gap-4 w-full py-3">
                                {/* image - left*/}
                                <div className="w-12 h-12 sm:w-[71px] sm:h-[71px]">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        className="h-full w-full object-cover rounded"
                                    />
                                </div>
                                {/* right */}
                                <div className="flex flex-col sm:gap-3 justify-between w-full">
                                    {/* description + items btn */}
                                    <div className="flex justify-between w-full">
                                        <p className="text-[8px] sm:text-sm w-[100px] sm:w-[200px]">
                                            {product.title} - 50g
                                        </p>
                                        <div className="flex items-center justify-between w-[50px] sm:w-[70px]">
                                            <span className="cursor-pointer">
                                                <Minus size={14} />
                                            </span>
                                            <span className="text-sm sm:text-xl">1</span>
                                            <span className="cursor-pointer">
                                                <Plus size={14} />
                                            </span>
                                        </div>
                                    </div>
                                    {/* remove btn + price */}
                                    <div className="flex items-center justify-between text-sm">
                                        <button className="uppercase cursor-pointer text-[10px] sm:text-sm text-gray-600 hover:text-red-600">
                                            remove
                                        </button>
                                        <span className="text-[12px] sm:text-sm">€{product.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex-shrink-0 mt-6 sm:mt-0">
                    {/* divider */}
                    <div className="border-b border-[#A0A0A0] hidden sm:block my-4"></div>
                    {/* sub total */}
                    <div className="flex items-center justify-between w-full py-2">
                        <span className="text-xs sm:text-base">Subtotal</span>
                        <span className="font-medium text-base">€3.90</span>
                    </div>
                    {/* delivery */}
                    <div className="flex items-center justify-between w-full pb-2 pt-2">
                        <span className="text-xs sm:text-base">Delivery</span>
                        <span className="font-medium text-base">€3.95</span>
                    </div>
                    {/* divider */}
                    <div className="border-b border-[#A0A0A0] my-4"></div>
                    {/* total */}
                    <div className="flex items-center justify-between w-full pb-2">
                        <span className="font-medium text-base">Total</span>
                        <span className="font-medium text-xl">€7.85</span>
                    </div>

                    <Button className="bg-[#282828] text-white w-full my-3">purchase</Button>
                </div>
            </div>
        </div>
    )
}

export default CartPopup