import React from 'react';

export default function SearchBar() {
  return (
    <div className="h-screen absolute inset-0 bg-black/50 z-40">
      <form className="absolute z-20 top-10 rounded bg-white p-1 py-2 font-roboto right-0 left-0 flex items-center justify-between max-w-2xl mx-auto">
        <input
          type="text"
          id="search-bar"
          className="focus:outline-none w-full px-1 font-light"
          placeholder="Search For Recipes"
        />
        <button type="submit" className="">
          <i className="py-1 px-2 duration-200 text-slate-700  cursor-pointer fa-solid fa-magnifying-glass " />
        </button>
      </form>
    </div>
  );
}
