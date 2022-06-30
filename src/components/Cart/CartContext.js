import { createContext, useState, useEffect } from "react"
import { toast } from "react-toastify";


export const cartContext = createContext([]);
const { Provider } = cartContext;


const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalProds, setTotalProds] = useState(0);

    useEffect(() => {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
            setCart(cart);
            calculateTotals(cart);
        }
    }, []);

    useEffect(() => {
        calculateTotals(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const calculateTotals = (cart) => {
        let totalPrice = 0;
        let totalProds = 0;
        cart.forEach(item => {
            totalPrice += item.product.price * item.count;
            totalProds += item.count;
        });
        setTotalPrice(totalPrice);
        setTotalProds(totalProds);
    }

    const clearCartStates = () => {
        setCart([]);
        setTotalPrice(0);
        setTotalProds(0);
    }

    const cartCheckout = (orderId) => {
        toast.success("¡Felicitaciones! ¡Tu compra ha sido completada! La identificación del pedido es: " + orderId, { autoClose: false, });
        clearCartStates();
    }


    const addToCart = (product, count) => {
        let cartProduct = { product, count };
        let tempCart = [];

        if (isInCart(product)) {
            cartProduct = cart.find(item => item.product.name === product.name)
            if (cartProduct.count + count <= product.stock) {
                cartProduct.count += count;
                toast.success("Has añadido " + count + " Producto/s al carrito!");
            } else {
                toast.error("No puedes agregar más de" + product.stock + " unidades de " + product.name + " a tu carrito!");
                return;
            }
        } else {
            toast.success("Ud Agrego " + count + " Producto/s al carrito!");
            tempCart = [cartProduct, ...cart]
            setCart(tempCart)
        }
    }

    const clearCart = () => {
        clearCartStates();
        localStorage.removeItem("cart");
        toast.info("Productos eliminados.");
    }

    const deleteFromCart = (product) => {
        if (isInCart(product)) {
            const tempCart = cart.filter(item => item.product !== product);
            setCart(tempCart);
            toast.info(product.name + " Eliminado del carrito");
            if (tempCart.length === 0) {
                clearCart();
            }
        }
    }

    const isInCart = (product) => {
        return cart && cart.some(item => item.product.name === product.name);
    }

    return (
        <Provider value={{ cart, deleteFromCart, addToCart, clearCart, totalPrice, totalProds, cartCheckout }}>
            {children}
        </Provider>
    )
}

export default CartProvider