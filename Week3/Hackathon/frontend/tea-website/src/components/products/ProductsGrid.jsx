import { products } from '../../constants/gernal'
import ProductCard from './ProductCard'

const ProductsGrid = () => {
  return (
    <div className='w-full'>
      <div className='flex items-center justify-end font-montserrat'>
        {/* filter */}
        {/* sortings */}
        <select
          defaultValue="default"
          className="w-32 p-2 bg-white text-gray-700 focus:outline-none focus:ring-0 cursor-pointer"
        >
          <option value="default" disabled className="uppercase cursor-pointer">
            Sort By
          </option>
          <option value="high" className="uppercase cursor-pointer">High Price</option>
          <option value="low" className="uppercase cursor-pointer">Low Price</option>
          <option value="az" className="uppercase cursor-pointer">A - Z</option>
          <option value="za" className="uppercase cursor-pointer">Z - A</option>
          <option value="reset" className="uppercase cursor-pointer">Default</option>
        </select>


      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-12 my-6">
        {products.map((product) => (
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

export default ProductsGrid