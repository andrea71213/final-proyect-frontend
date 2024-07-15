import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context';
import { useContext } from 'react';

const OrderCard = (data) => {
  const { handleDelete } = useContext(ShoppingCartContext)
  const { price, images, title, id } = data.data
  
  return (
    <div className="flex justify-between items-center">
      <div className='flex items-center gap-2'>
        <figure className='w-20 h-20'>
          <img className='w-full h-full rounded-lg object-cover' src={images[0]} alt='' />
        </figure>
        <p className='text-sm font-light'>
          {title}
        </p>
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-md font-medium'>
          ${price}
        </p>
        <XMarkIcon onClick={() => handleDelete(id)} className='h-6 w-6 text-black cursor-pointer' />
      </div>
      
    </div>
  );
};

export default OrderCard;