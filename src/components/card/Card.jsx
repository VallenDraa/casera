import React from 'react';
import { Link } from 'react-router-dom';
import handleSave from '../../handleSave/handleSave';

export default function Card({ saved }) {
  return (
    <div className="bg-cover bg-[url('https://source.unsplash.com/random/')] h-[500px] relative rounded-lg min-w-full max-w-md lg:max-w-lg font-ssp">
      <div
        className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
font-bold"
      >
        {/*  */}
        <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
          {saved ? (
            <i className=" fa-solid fa-heart" />
          ) : (
            <i className=" fa-regular fa-heart" />
          )}
          <div
            onClick={(e) => handleSave(e)}
            className="absolute z-20 inset-0"
          ></div>
          {saved ? (
            <span className="text-[12px]">Saved</span>
          ) : (
            <span className="text-[12px]">Save Dish</span>
          )}
        </div>
        {/* category */}
        <ul className="relative ml-2 space-y-2 w-fit text-slate-100 text-sm text-left">
          {/* meal type */}
          <li className="flex items-center gap-3 rounded-full">
            <i className="fa-solid fa-bowl-rice  h-3 w-3" />
            <span className="font-light">Vegetarian</span>
          </li>
          {/* origin */}
          <li className="flex items-center gap-3 rounded-full">
            <i className="fa-solid fa-map-location h-3 w-3" />
            <span className="font-light">Italian</span>
          </li>
        </ul>
        {/* name */}
        <div className="font-ssp text-slate-100 mx-2 border-t-2 border-red-500">
          <Link
            to="/recipe/123"
            className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
          >
            <div>
              <span className="text-2xl font-bold text-slate-200">Spicy</span>{' '}
              Arrabiata Penne
            </div>
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <p className="text-xs font-light italic px-2 mt-1 mb-3 text-slate-300 font-roboto">
            Pasta, Curry
          </p>
        </div>
      </div>
    </div>
  );
}
