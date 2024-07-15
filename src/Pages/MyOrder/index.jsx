import { useContext } from "react"
import { ShoppingCartContext } from "../../Context"
import LastOrder from "../../Components/LastOrder";

function MyOrder() {
  const { order } = useContext(ShoppingCartContext)
  /* Para saber en que path nos encontramos */
  const currentPath = window.location.pathname
  let indexOrder = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (indexOrder === 'last') indexOrder = order?.length -1

  return (
    <div className="text-center">
      Estas comprando ... 🛒🛒🛒
      <div className='flex flex-col gap-3'>
        {
          order[indexOrder]?.products.map(product => (
            <LastOrder 
              key={product.id}
              data={product}
            />
          ))
        }
      </div>
    </div>
  )
}

export default MyOrder
