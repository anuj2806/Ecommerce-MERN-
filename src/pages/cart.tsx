import { useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/cart-item";
import { Link } from "react-router-dom";

const Cart = () => {
    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
    const subtotal = 1000;
    const shippingCharges = 30;
    const tax = -30
    const discount =300
    const total =700

    const cartItems =[{
        productId: "dfgh",
        photo: "https://m.media-amazon.com/images/I/71jG+e7roXL._SX679_.jpg",
        name: "Macbook",
        price: 10000,
        quantity:2,

    }]
  return (
    <div className="cart">
        <main>
        {cartItems.length>0? cartItems.map((i,index)=>(
                <CartItem key={index}  cartItem={i}/>
            )):<h1>No Items Added</h1>
           
        }
        </main>
        <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red"> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ₹{discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon <VscError />
            </span>
          ))}
          {cartItems.length>0 && (<Link to={'/shipping'}>Checkout</Link>)}
      </aside>
    </div>
  )
}

export default Cart