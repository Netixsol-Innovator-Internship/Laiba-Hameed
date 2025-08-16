const ProductCard = ({ image, title, description, price }) => {
    return (
        <div className="w-auto bg-white shadow-md overflow-hidden font-montserrat cursor-pointer">
            {/* Image */}
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                <img
                    src={image || "/placeholder.svg"}
                    alt={title}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col items-center justify-center font-montserrat space-y-2">
                {/* Title */}
                <h3 className="text-base  text-black truncate">
                    {title}
                </h3>

                {/* Description */}
                <p className="text-base xt-gray-600 line-clamp-2">
                    {description}
                </p>

                {/* Price */}
                <p className="text-base font-medium text-black">
                    ${price} <span className="text-gray-500 text-sm">/ 50g</span>
                </p>
            </div>
        </div>
    )
}

export default ProductCard
