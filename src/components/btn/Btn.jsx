export default function Btn({ width, text, textSize, icon, bold, color }) {
  return (
    <>
      {/* if color is green */}
      {color === 'green' && (
        <button
          className={`bg-green-500 hover:bg-green-600 active:bg-green-700 
          focus:ring-2 focus:ring-green-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is orange */}
      {color === 'orange' && (
        <button
          className={`bg-orange-500 hover:bg-orange-600 active:bg-orange-700 
          focus:ring-2 focus:ring-orange-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is blue */}
      {color === 'blue' && (
        <button
          className={`bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer  
          focus:ring-2 focus:ring-blue-300 rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is pink */}
      {color === 'pink' && (
        <button
          className={`bg-pink-500 hover:bg-pink-600 active:bg-pink-700 cursor-pointer  
          focus:ring-2 focus:ring-pink-300 rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is yellow */}
      {color === 'yellow' && (
        <button
          className={`bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 
          focus:ring-2 focus:ring-yellow-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is sky */}
      {color === 'sky' && (
        <button
          className={`bg-sky-500 hover:bg-sky-600 active:bg-sky-700 cursor-pointer  
          focus:ring-2 focus:ring-sky-300 rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is slate */}
      {color === 'slate' && (
        <button
          className={`bg-slate-500 hover:bg-slate-600 active:bg-slate-700 cursor-pointer  
          focus:ring-2 focus:ring-slate-300 rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={{ width }}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
    </>
  );
}
