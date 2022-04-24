import { useEffect, useRef, useState } from 'react';

export default function StateToast({ payload }) {
  console.log(payload);
  const toast = useRef(null);
  const toastTimerBar = useRef(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    setTimeout(() => hideToast(), 5000);
  }, []);

  const hideToast = () => {
    if (!toast.current) return;

    toast.current.classList.add('translate-x-[110%]');
    setTimeout(() => setShow(false), 300);
  };

  return (
    <>
      {show &&
        (payload.ok ? (
          <div
            ref={toast}
            className="animate-toast transform fixed bottom-5 sm:right-5 min-w-full sm:min-w-fit sm:w-60 rounded duration-300 px-4 sm:px-0 sm:shadow-lg z-50"
          >
            <header className="bg-green-400 rounded-t font-roboto text-green-700 flex items-center justify-between gap-2 py-1 px-2 text-sm">
              <div className="flex items-center gap-2 ">
                <i className="fa-solid fa-square-check " />
                <p className="font-bold">Success Message !</p>
              </div>
              <i
                className="fa-solid fa-xmark cursor-pointer p-1 duration-200 hover:text-green-600 active:text-green-900"
                onClick={hideToast}
              />
            </header>
            <main className="bg-green-200 p-2 font-ssp text-sm text-green-800 ">
              {payload.msg ? (
                payload.msg
              ) : (
                <p>Can't Connect To Server, Please Try Again Later !</p>
              )}
            </main>

            {/* timer bar */}
            <footer
              ref={toastTimerBar}
              className="animate-timer h-1 w-0 bg-green-700 duration-200"
              style={{}}
            ></footer>
          </div>
        ) : (
          <div
            ref={toast}
            className="animate-toast transform fixed bottom-5 sm:right-5 min-w-full sm:min-w-fit sm:w-60 rounded duration-300 px-4 sm:px-0 sm:shadow-lg z-50"
          >
            <header className="bg-red-400 rounded-t font-roboto text-red-700 flex items-center justify-between gap-2 py-1 px-2 text-sm">
              <div className="flex items-center gap-2 ">
                <i className="fa-solid fa-triangle-exclamation" />
                <p className="font-bold relative bottom-[-1px]">
                  Error Alert !
                </p>
              </div>
              <i
                className="fa-solid fa-xmark cursor-pointer p-1 duration-200 hover:text-red-600 active:text-red-900"
                onClick={hideToast}
              />
            </header>
            <main className="bg-red-200 p-2 font-ssp text-sm text-red-800 ">
              {payload.msg ? (
                payload.msg
              ) : (
                <p>Can't Connect To Server, Please Try Again Later !</p>
              )}
            </main>

            {/* timer bar */}
            <footer
              ref={toastTimerBar}
              className="animate-timer h-1 w-0 bg-red-700 duration-200"
              style={{}}
            ></footer>
          </div>
        ))}
    </>
  );
}
