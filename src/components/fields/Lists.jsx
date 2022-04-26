export default function Field({ values, name = false }) {
  return (
    <div className="flex flex-col w-full text-lime-600 font-ssp">
      {name && <p className="text-sm">{name}</p>}
      <ul className="list-disc list-inside text-slate-500">
        {values.map((val, i) => (
          <li className="ml-2" key={i}>
            <span className="text-slate-700">{val}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
