export default function Input({ editMode, type, id }) {
  return (
    <>
      {editMode ? (
        <>
          <label className="text-sm" htmlFor={id}>
            {id}
          </label>
          <input
            type={type}
            id={id}
            className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
          />
        </>
      ) : (
        <>
          <label className="text-sm" htmlFor={id}>
            {id}
          </label>
          <input
            type={type}
            id={id}
            disabled
            className="mt-1 text-slate-500 disabled:text-slate-400 focus:text-slate-800  disabled:cursor-not-allowed w-full bg-transparent border-b-2 font-roboto border-slate-400 focus:border-lime-500 outline-none duration-200"
          />
        </>
      )}
    </>
  );
}
