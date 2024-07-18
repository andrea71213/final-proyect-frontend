import { useContext } from "react"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"
import { Link } from 'react-router-dom';
import './compras.css';

function MyOrders() {
  const { order } = useContext(ShoppingCartContext)

  return (
    <>
    <div className="compras-container">
        <div className="compras-box mt-24">
        <h1>Mis Compras 🏪🛒 </h1>
      </div>
      <div className="miscompras">
        {
          order.map((order, index) => (
            <Link key={index} to={`/my-orders/${index}`}>
              <OrdersCard 
              key={order.length}
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
              />
            </Link>
          ))
        }
       </div>
    </div>
    </>
  )
}

export default MyOrders
