import { useContext } from "react";
import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { ShoppingCartContext } from "../../Context";

const ShoppingCartNav = () => {
  const { count, openCheckoutSideMenu, closeProductDetail } = useContext(ShoppingCartContext)

  const openCheckOutSideMenu = () => {
    openCheckoutSideMenu()
    closeProductDetail()
  }

  return (
    <div className='relative flex gap-0.5 items-center' onClick={() => openCheckOutSideMenu()}>
      <ShoppingCartIcon className='h-6 w-6 fill-none stroke-black cursor-pointer' />
      <div className='absolute bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white'>
        {count}
      </div>
    </div>
  )
}

export default ShoppingCartNav