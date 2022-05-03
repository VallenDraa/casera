import { Link } from 'react-router-dom';

export default function UserCard({ username, picture }) {
  return (
    <section className=" border-2 border-slate-200 shadow-sm rounded-lg">
      <div className="flex flex-col items-center gap-5 bg-slate-100 py-8 rounded-lg">
        {picture ? (
          <img
            src={picture}
            className="rounded-full w-36 h-36 md:w-28 md:h-28 object-cover shadow-md"
          />
        ) : (
          <div className="flex justify-center items-center w-36 h-36 md:w-28 md:h-28 rounded-full bg-slate-200 shadow-md">
            <i className="fa-solid fa-user text-7xl md:text-6xl text-slate-400" />
          </div>
        )}
        <p className="text-slate-500 font-roboto text-lg md:text-base font-semibold tracking-wide">
          {username}
        </p>
      </div>
      <div className="bg-slate-200 h-16 w-full rounded-b-lg group hover:bg-slate-300 duration-200">
        <Link
          className="w-full h-full flex flex-row items-center justify-center relative text-lg"
          to={`/user/${username}`}
        >
          <span className="duration-200 text-lime-500 group-hover:text-lime-600 transform group-hover:-translate-x-5">
            See Profile
          </span>
          <i className="absolute text-orange-400 opacity-0 group-hover:opacity-100 inset-x-1/2 group-hover:inset-x-2/3 duration-200 fa-solid fa-right-from-bracket" />
        </Link>
      </div>
    </section>
  );
}
