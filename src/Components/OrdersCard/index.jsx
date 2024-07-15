import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
  const { totalPrice, totalProducts } = props
  const today = new Date().toLocaleDateString('es-ES');
  
  return (
    <div className="flex justify-between items-center border border-black p-4 w-80 rounded-lg mb-4 mt-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col">
          <p>{today} </p>
          <p className='font-bold'>{totalProducts} Articulos</p>
        </div>
        <div className='flex items-center gap-2'>
          <p className="font-medium text-2xl">${totalPrice}</p>
          <ChevronRightIcon className='h-4 w-4 text-black cursor-pointer' />
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;