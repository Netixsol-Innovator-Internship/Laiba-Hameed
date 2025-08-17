import React from 'react'
// import { products } from '../../constants/gernal'
import ProductCard from './ProductCard'
import { useNavigate } from 'react-router-dom'

const ProductsGrid = ({products}) => {
  const navigate = useNavigate();
  const handleProductClick = (slug)=>{
    navigate(`/product/${slug}`)
  }
  return (
    <div className='w-full'>
      <div className='flex items-center justify-end font-montserrat'>
        {/* filter */}
        {/* sortings */}
        <select className="w-32 p-2 bg-white text-gray-700 focus:outline-none focus:ring-0 cursor-pointer">
          <option disabled selected className="uppercase cursor-pointer">
            Sort By
          </option>
          <option className="uppercase cursor-pointer">High Price</option>
          <option className="uppercase cursor-pointer">Low Price</option>
          <option className="uppercase cursor-pointer">A - Z</option>
          <option className="uppercase cursor-pointer">Z - A</option>
          <option className="uppercase cursor-pointer">Default</option>
        </select>

      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 my-6">
        {products.map((product) => (
          <ProductCard
            onClick = {()=>handleProductClick(product.slug)}
            key={product._id}
            image={`${import.meta.env.VITE_API_URL}/uploads/${product.images[0]}`}
            title={product.name}
            price={product.variants[0].price}
            weight = {product.variants[0].weight}
          />
        ))}
      </div>
    </div>
  )
}

export default React.memo(ProductsGrid)