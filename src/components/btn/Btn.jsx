export default function Btn({ width, text, textSize, icon, bold, color }) {
  const classes = `cursor-pointer  rounded p-2 flex items-center justify-center gap-2 bg-${color}-500 hover:bg-${color}-600 active:bg-${color}-700 text-white font-roboto relative text-${textSize} duration-200 ${
    bold ? 'font-semibold' : ''
  } tracking-wide`;

  return (
    <button className={classes} style={{ width }}>
      {icon && icon}
      <span>{text}</span>
    </button>
  );
}
