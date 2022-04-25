import { useEffect, useState } from 'react';

export default function Notice({ on }) {
  const [show, setShow] = useState(on);

  useEffect(() => {
    setTimeout(() => setShow(false), 2000);
  }, []);

  return (
    <>
      {show && (
        <div className="animate-fade-out absolute inset-0 transform translate-x-full flex items-center justify-center duration-200">
          <div className="border-t-[12px] border-lime-400 border-x-[8px] border-x-transparent transform translate-x-[2px] bottom-0 w-fit rotate-90"></div>
          <div className="flex items-center justify-center text-[12px] bg-lime-400 font-bold text-lime-700 p-1 rounded">
            Login First !
          </div>
        </div>
      )}
    </>
  );
}
