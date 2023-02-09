import { useState, useEffect } from 'react';

export default function Loading() {
  const [msg, setMsg] = useState(null);

  const sentences = [
    'Finishing The Dish',
    'Calling The Head Chef',
    'Roasting some Beef',
    'Waiting For The Cake To Bake',
    'Boiling The Water',
    'Heating The Wok',
    'Melting The Cheese',
    'Chopping Some Onions',
    'Making a Wonderful Dish',
    'Pouring The MSG',
  ];

  useEffect(() => {
    const pickMsg = () => {
      const i = Math.floor(Math.random() * sentences.length);
      setMsg(sentences[i]);
    };
    pickMsg();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
      <div className="relative flex justify-center">
        {/* green ball */}
        <div className="animate-green-ball h-10 w-10 rounded-full bg-lime-500 " />
        {/* orange ball */}
        <div className="mix-blend-difference animate-orange-ball h-10 w-10 rounded-full bg-orange-500" />
      </div>
      <p className="mt-3 animate-pulse font-ssp font-light italic text-slate-600">
        {msg}
      </p>
    </div>
  );
}
