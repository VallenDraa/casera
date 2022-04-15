import React from 'react';

export default function homeAside() {
  return (
    <aside className="w-fit absolute items-center h-fit transform -rotate-90 hidden lg:flex lg:-left-[290px] xl:-left-[340px] top-1/3 font-ssp">
      <div className="h-[2px] w-16 bg-black"></div>
      <span className="w-72 text-center text-2xl font-light ">
        Healthy and <span className="font-semibold italic">Delicious !</span>
      </span>
      <div className="h-[2px] w-16 bg-black"></div>
    </aside>
  );
}
