import React from 'react';
import { Route, Redirect } from 'react-router';

export default function SearchBar() {
  function handleSearch(e) {
    e.preventDefault();
    const link = '/search?q=' + e.target.children[0].value;
    window.location.href = link;
  }

  return (
    <div className="h-screen fixed inset-0 bg-black/50 z-40">
      <form
        onSubmit={(e) => handleSearch(e)}
        className="absolute z-20 top-10 rounded bg-white p-1 py-2 font-roboto right-0 left-0 flex items-center justify-between max-w-2xl mx-auto"
      >
        <input
          type="text"
          id="search-bar"
          className="focus:outline-none w-full px-1 font-light"
          placeholder="Search For Recipes"
          autoFocus
        />
        <button type="submit" className="">
          <i className="py-1 px-2 duration-200 text-slate-700  cursor-pointer fa-solid fa-magnifying-glass " />
        </button>
      </form>
    </div>
  );
}
