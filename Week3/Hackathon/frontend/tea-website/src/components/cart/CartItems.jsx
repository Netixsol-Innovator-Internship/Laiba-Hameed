import { Minus, Plus } from "lucide-react"
import { products } from "../../constants/gernal"
import Button from "../shared/buttons/button"

const CartItems = () => {
    return (
        <div className="sm:w-[455px] font-montserrat mb-12">
            {/* cart item */}
            {products.map((product) => (
                <div key={product.id} className="flex items-center gap-4 w-full py-3">
                    {/* image - left*/}
                    <div className="w-[71px] h-[71px]">
                        <img src={product.image} className="h-full w-full object-cover" />
                    </div>
                    {/* right */}
                    <div className="flex flex-col gap-3 justify-between w-full">
                        {/* discription + items btn */}
                        <div className="flex justify-between w-full">
                            <p className="text-sm w-[200px]" >{product.title} - 50g</p>
                            <div className="flex items-center justify-between w-[70px]">
                                <span className=" cursor-pointer" > <Minus size={18} /> </span>
                                <span className="text-xl"> 1 </span>
                                <span className="cursor-pointer" > <Plus size={18}/> </span>
                            </div>
                        </div>
                        {/* remove btn + price */}
                        <div className="flex items-center justify-between text-sm" >
                            <button className="uppercase cursor-pointer">
                                remove
                            </button>
                            <span>€{product.price}</span>
                        </div>
                    </div>
                </div>
            ))}

            <div className="border-b border-[#A0A0A0] mt-4 mx-6"></div>

            <div className="flex items-center justify-between py-8 w-full">
                <span>subtotal</span>
                <span className="font-medium" >€3.90</span>
            </div>
            <div className="flex items-center justify-center w-full">
            <Button className="border" > back to shopping </Button>
            </div>
        </div>
    )
}

export default CartItems