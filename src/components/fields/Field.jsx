export default function Field({ value = '', name = false }) {
  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      {name && <p className="text-sm">{name}</p>}
      <div className="mt-1 text-sm text-slate-800 w-full bg-transparent border-b-2 font-roboto border-slate-400">
        {value}
      </div>
    </div>
  );
}
