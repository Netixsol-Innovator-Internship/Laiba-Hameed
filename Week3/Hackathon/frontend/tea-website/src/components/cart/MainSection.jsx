import CartItems from "./CartItems"
import OrderSummary from "./OrderSummary"

const MainSection = () => {
  return (
    <div className="py-6 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <CartItems/>
        <OrderSummary/>
    </div>
  )
}

export default MainSection