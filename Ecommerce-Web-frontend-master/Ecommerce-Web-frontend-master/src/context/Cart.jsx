import e from 'cors';
import { useState ,  useContext , createContext , useEffect} from 'react'


const CartContext = createContext();

const CartProvider = ({children}) => {
    const [cart , setCart] = useState([])

    useEffect(() => {
        const existingCart = localStorage.getItem('cart');
        if(existingCart){
            setCart(JSON.parse(existingCart))
        }
    }, [])

    return (
        <CartContext.Provider value={[cart , setCart]}>
            {children}
        </CartContext.Provider>
    )
}

// custom hook
const useCart = () => useContext(CartContext)
export {CartProvider , useCart}