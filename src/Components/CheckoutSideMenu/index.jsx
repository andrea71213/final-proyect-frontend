import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from "../../Context";
import { XMarkIcon } from '@heroicons/react/24/solid'
import OrderCard from '../OrderCard';
import { totalPrice } from '../../utils'
import './styles.css'


const CheckoutSideMenu = () => {
  const today = new Date().toLocaleDateString('es-ES');
  const { isCheckoutSideMenuOpen, closeCheckoutSideMenu, cartProducts, setOrder, order, setCartProducts, setCount, setSearchByTitle } = useContext(ShoppingCartContext)

  const handleCheckout = () => {
    
    const orderToAdd = {
      date:  today,
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts)
    }
    setOrder([
      ...order,
      orderToAdd
    ])
    setCartProducts([])
    setCount(0)
    setSearchByTitle(null)
    closeCheckoutSideMenu()
  }


  return (
    <aside className={`${isCheckoutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed right-0 top-[68px] border bg-white border-black rounded-lg w-[360px] h-[calc(100vh-68px)] scrollable-cards`}>
      <div className='flex justify-between items-center p-6'>
        <h2 className='font-medium text-xl'>Mi Orden</h2>
        <div>
          <XMarkIcon onClick={() => closeCheckoutSideMenu()} className='h-6 w-6 text-black cursor-pointer' />
        </div>
      </div>

      <div className='p-6 flex flex-col gap-3 flex-1'>
        {
          cartProducts.map(product => (
            <OrderCard 
              key={product.id}
              data={product}
            />
          ))
        }
      </div>

      <div className='p-6'>
        <p className='flex justify-between items-center mb-3'>
          <span className='font-light'>Total:</span>
          <span className='font-medium text-xl'>${totalPrice(cartProducts)}</span>
        </p>
        <Link to='/my-orders/last'>
          <button className='w-full bg-black text-white py-3 rounded-lg' onClick={handleCheckout}>Compra</button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;