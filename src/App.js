import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";
import CartProvider from "./components/Cart/CartContext";
import NavBar from "./components/NavBar/NavBar";



function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <NavBar />
                <Main />
                <Footer />
            </ BrowserRouter>
        </CartProvider>
    )
}

export default App;