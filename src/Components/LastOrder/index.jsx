const LastOrder = (data) => {
  const { price, images, title } = data.data
  
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
      </div>
      
    </div>
  );
};

export default LastOrder;