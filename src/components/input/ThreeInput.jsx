export default function ThreeInput({ editMode, innerRef }) {
  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      <label className="text-sm">Hobby</label>
      <span className="text-[10px] text-lime-700">
        *You can fill up to 3 hobbies
      </span>
      <div ref={innerRef} className="mt-1 flex gap-2 justify-between">
        {editMode ? (
          <>
            <input
              type="text"
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
            <input
              type="text"
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
            <input
              type="text"
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              disabled
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
            <input
              type="text"
              disabled
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
            <input
              type="text"
              disabled
              className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
            />
          </>
        )}
      </div>
    </div>
  );
}
