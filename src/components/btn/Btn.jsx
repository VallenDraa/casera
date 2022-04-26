export default function Btn({
  type = 'button',
  style = {
    width: '100%',
  },
  text,
  textSize = 'base',
  icon,
  bold = false,
  color = 'slate',
}) {
  if (color === '') {
    color = 'slate';
  }
  console.log(style);

  return (
    <>
      {/* if color is green */}
      {color === 'green' && (
        <button
          type={type}
          className={`bg-green-500 hover:bg-green-600 active:bg-green-700 
          focus:ring-2 focus:ring-green-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={style}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is lime */}
      {color === 'lime' && (
        <button
          type={type}
          className={`bg-lime-500 hover:bg-lime-600 active:bg-lime-700 
          focus:ring-2 focus:ring-lime-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={style}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is orange */}
      {color === 'orange' && (
        <button
          type={type}
          className={`bg-orange-500 hover:bg-orange-600 active:bg-orange-700 
          focus:ring-2 focus:ring-orange-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={style}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}

      {/* if color is red */}
      {color === 'red' && (
        <button
          type={type}
          className={`bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer  
          focus:ring-2 focus:ring-red-300 rounded p-2 flex items-center justify-center gap-2 text-white active:text-red-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={style}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
      {/* if color is slate */}
      {color === 'slate' && (
        <button
          type={type}
          className={`bg-slate-500 hover:bg-slate-600 active:bg-slate-700 
          focus:ring-2 focus:ring-slate-300 cursor-pointer  rounded p-2 flex items-center justify-center gap-2 text-white active:text-slate-200 font-roboto relative text-${textSize} duration-200 shadow-md ${
            bold ? 'font-semibold' : ''
          } `}
          style={style}
        >
          {icon && icon}
          <span>{text}</span>
        </button>
      )}
    </>
  );
}
