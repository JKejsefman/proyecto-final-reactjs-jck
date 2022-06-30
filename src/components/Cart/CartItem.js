import { Button } from "@mui/material";
import { useContext } from 'react';
import { cartContext } from "../Cart/CartContext";


const CartItem = (props) => {
    const useCartContext = useContext(cartContext);
    const { deleteFromCart } = useCartContext;

    return (
        <div key={props.item.product.id} id="" className="dropShadow cart">
            <div className="cartText">
                <img alt="" src={props.item.product.img} />
                <span><h3>Item:</h3><p>{props.item.product.name}</p></span>
                <span><h3>Precio y cantidad del artículo: </h3><p>${props.item.product.price} x {props.item.count} unidad/es</p></span>
                <span><h3>Total:</h3> <p>${props.item.product.price * props.item.count}</p></span>
            </div>
            <div className="cartButtons">
                <Button onClick={() => deleteFromCart(props.item.product)} variant="contained" color="error">Eliminar Productos</Button>
            </div>
        </div>)
}
export default CartItem