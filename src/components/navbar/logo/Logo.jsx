import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <div className="flex justify-between items-center gap-4">
      <Link to="/" className="text-xl font-bold flex items-center">
        <i className="inline-block mr-1 fa-solid fa-kitchen-set text-xl"></i>
        <div className="flex flex-col">
          <span className="leading-4">casera</span>
          <p className="text-[8px] text-slate-600 leading-[.4rem] font-normal ">
            Made By VallenDra While{' '}
            <i className="ml-[2px] fa-solid fa-utensils" />
          </p>
        </div>
      </Link>
    </div>
  );
}
