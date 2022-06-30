import { db } from "../Firebase/Firebase";
import { cartContext } from "../Cart/CartContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useContext, useState, useEffect } from 'react';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import validator from "validator";


const CartCheckoutForm = (props) => {
    const useCartContext = useContext(cartContext);
    const { clearCart, totalPrice, totalProds, cartCheckout } = useCartContext;
    const [buyerName, setBuyerName] = useState("");
    const [buyerEmail, setBuyerEmail] = useState("");
    const [buyerEmailConf, setBuyerEmailConf] = useState("");
    const [buyerPhone, setBuyerPhone] = useState("");
    const [validName, setValidName] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [validEmailConf, setValidEmailConf] = useState(false);
    const [validPhone, setValidPhone] = useState(false);


    const handleCheckout = () => {
        const newOrder = {
            buyer: {
                name: buyerName,
                phone: buyerPhone,
                email: buyerEmail
            },
            items: props.cart,
            date: serverTimestamp(),
            total: totalPrice
        }
        const ordersCollection = collection(db, "orders");
        const order = addDoc(ordersCollection, newOrder);
        order.then((res) => {
            const orderId = res.id;
            cartCheckout(orderId);
        });
    }

    const handleNameChange = (e) => {
        setBuyerName(e.target.value);
    }

    const handleEmailChange = (e) => {
        setBuyerEmail(e.target.value);
    }

    const handleEmailConfChange = (e) => {
        setBuyerEmailConf(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setBuyerPhone(e.target.value);
    }

    useEffect(() => {
        setValidName(validator.isAlpha(buyerName, "es-ES", { ignore: " " }));
        setValidEmail(validator.isEmail(buyerEmail));
        setValidEmailConf(validator.equals(buyerEmail, buyerEmailConf));
        setValidPhone(validator.isNumeric(buyerPhone, "es-ES"));
    }, [buyerName, buyerEmail, buyerEmailConf, buyerPhone]);


    return (
        <>
            <h2>Checkout Information:</h2>
            <TextField className="formItems" error={buyerName !== "" && !validName} required variant="filled" label="Nombre Completoe" onChange={handleNameChange} value={buyerName} />
            <TextField className="formItems" error={buyerPhone !== "" && !validPhone} required variant="filled" label="Telefono" onChange={handlePhoneChange} value={buyerPhone} />
            <TextField className="formItems" error={buyerEmail !== "" && !validEmail} required variant="filled" label="Email" onChange={handleEmailChange} value={buyerEmail} />
            <TextField className="formItems" error={buyerEmailConf !== "" && !validEmailConf} required variant="filled" label="Confirmar Correo" onChange={handleEmailConfChange} value={buyerEmailConf} />
            <div className="cartFooter dropShadow cart">
                <div className="cartText">
                    <h3>Total: ${totalPrice}</h3>
                    <h3>Total Productos: {totalProds}</h3>
                </div>
                <div className="cartButtons">
                    <Button onClick={handleCheckout} variant="contained" disabled={(!validName || !validEmail || !validEmailConf || !validPhone)} color="success">Compra Total</Button>
                    <Button onClick={clearCart} variant="contained" color="error">Limpiar Carro</Button>
                </div>
            </div>
        </>
    )
}
export default CartCheckoutForm