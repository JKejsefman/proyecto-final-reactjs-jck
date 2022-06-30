import CartItem from "../Cart/CartItem";
import CartCheckoutForm from "../Cart/CartCheckoutForm";
import { cartContext } from "../Cart/CartContext";
import { useContext } from 'react';


const CartContainer = (props) => {
    const useCartContext = useContext(cartContext);
    const { deleteFromCart } = useCartContext;


    return (
        <div id="cartItems">
            <div id="cartContainer" className="dropShadow cart cartContent">
                <h2>Detalle Carrito</h2>
                {props.cart.map(item => (
                    <CartItem key={item.product.id} item={item} deleteFromCart={deleteFromCart} />
                ))}
            </div>
            <div id="cartContainer" className="dropShadow cart cartForm">
                <CartCheckoutForm cart={props.cart} />
            </div>
        </div>
    )
}
export default CartContainer