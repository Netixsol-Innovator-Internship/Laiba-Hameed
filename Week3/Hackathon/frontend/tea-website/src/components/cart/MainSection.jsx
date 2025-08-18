import { useEffect, useState } from "react";
import CartItems from "./CartItems";
import OrderSummary from "./OrderSummary";
import { getCartProducts } from "../../services/cartServices";
import { useNavigate } from "react-router-dom";
import Button from "../shared/buttons/button";

const MainSection = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubTotal] = useState(0);
  const [delivery, setDelivery] = useState(3.5);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleShoppingBtn = () => {
    navigate("/collections");
  };
  useEffect(() => {
    if (Array.isArray(cartProducts)) {
      let t = cartProducts.reduce(
        (total, current) => total + (current.total || 0),
        0
      );
      setSubTotal(t);
      setTotal(delivery + t);
    }
  }, [cartProducts]);
  const fetchCartProducts = async () => {
    let result = await getCartProducts();
    console.log(result.data);
    setCartProducts(result.data || []);
  };
  useEffect(() => {
    fetchCartProducts();
  }, []);
  return (
    <div className="py-6 flex flex-col lg:flex-row items-center lg:items-start justify-between">
      {cartProducts.length > 0 ?
        <>
          <CartItems
            subtotal={subtotal}
            cartProducts={cartProducts}
            fetchCartProducts={fetchCartProducts}
          />
          <OrderSummary subtotal={subtotal} total={total} delivery={delivery} />
        </> : <div className="w-full flex flex-col items-center justify-center">
          <p className="text-center py-12 text-lg font-montserrat">No Item in cart</p>
          <div className="flex items-center justify-center w-full">
            <Button className="border hover:bg-[#282828] hover:text-white" onClick={handleShoppingBtn}>
              {" "}
              back to shopping{" "}
            </Button>
          </div>
        </div>}
    </div>
  );
};

export default MainSection;
