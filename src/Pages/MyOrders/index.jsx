import { useContext } from "react"
import OrdersCard from "../../Components/OrdersCard"
import { ShoppingCartContext } from "../../Context"
import { Link } from 'react-router-dom';

function MyOrders() {
  const { order } = useContext(ShoppingCartContext)

  return (
    <>
      <div>
        <h1>Mis Compras 🏪🛒 </h1>
      </div>
      <div className="">
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
    </>
  )
}

export default MyOrders
