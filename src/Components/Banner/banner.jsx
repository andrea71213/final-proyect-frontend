import React from 'react';

function Banner() {
  return (
    <div className="relative w-full h-72 mt-24 bg-cover bg-center mb-8" style={{ backgroundImage: "url('/banner3.png')" }}>
      <div className="absolute inset-0"></div>
    </div>
  );
}

export default Banner;
