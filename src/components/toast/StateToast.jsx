import { useEffect, useRef, useState } from 'react';

export default function StateToast({ payload, showToast }) {
  const toast = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => setShow(true), []);

  const hideToast = () => {
    toast.current.classList.add('translate-x-[110%]');
    setTimeout(() => setShow(false), 300);
  };

  return (
    <>
      {show && (
        <div
          ref={toast}
          className="animate-slide-x transform absolute bottom-5 sm:right-5 min-w-full sm:min-w-fit sm:w-60 rounded duration-300 px-4 sm:px-0 sm:shadow-lg "
        >
          <header className="bg-red-400 rounded-t font-roboto text-red-700 flex items-center justify-between gap-2 py-1 px-2 text-sm">
            <div className="flex items-center gap-2 ">
              <i className="fa-solid fa-triangle-exclamation" />
              <p className="font-bold relative bottom-[-1px]">Error Alert !</p>
            </div>
            <i
              className="fa-solid fa-xmark cursor-pointer p-1 duration-200 hover:text-red-600 active:text-red-900"
              onClick={hideToast}
            />
          </header>
          <main className="bg-red-200 p-2 font-ssp text-sm text-red-800 rounded-b">
            {payload.msg ? (
              payload.msg
            ) : (
              <p>Can't Connect To Server, Please Try Again Later !</p>
            )}
          </main>
        </div>
      )}
    </>
  );
}
