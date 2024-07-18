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
    <div className="text-center mt-24 gap-3 pb-2">
      Estas comprando ... 🛒🛒🛒
      <div className='flex-col gap-3 pb-2'>
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
