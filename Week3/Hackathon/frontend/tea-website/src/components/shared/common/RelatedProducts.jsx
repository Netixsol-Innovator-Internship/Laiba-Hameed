import { products } from "../../../constants/gernal"
import ProductCard from "../../products/ProductCard"

const RelatedProducts = ({title}) => {
    return (
        <div className="flex flex-col items-center justify-center my-12">
            <h1 className="text-2xl md:text-[32px] font-prosto mb-6">{title}</h1>
            <div className="grid grid-cols-2 lg:grid-cols-3 my-6 max-w-[840px] gap-6 px-6 sm:px-10 lg:px-12 ">
                {products.slice(0, 3).map((product) => (
                    <ProductCard
                        key={product.id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                    />
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts