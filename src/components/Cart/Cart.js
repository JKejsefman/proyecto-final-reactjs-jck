import CartContainer from "../Cart/CartContainer";
import { cartContext } from "../Cart/CartContext";
import { useContext } from 'react';
import { Button } from "@mui/material";
import { Link } from "react-router-dom"


const Cart = () => {
    const useCartContext = useContext(cartContext);
    const { cart } = useCartContext;

    return (
        <div id="cartBackground">
            {cart.length === 0
                ? <Link className="styleRemove flexCart" to="/"><Button className="cartIsEmpty dropShadow" color="inherit"><h2>El carrito está vacío: haga clic para volver a la tienda</h2></Button></Link>
                : <CartContainer cart={cart} />
            }
        </div>
    )
}

export default Cart