import { Link } from 'react-router-dom';
import { useRef, useContext } from 'react';
import SearchBar from './searchbar/SearchBar';

export default function Navbar() {
  const contextMenu = useRef(null);
  const contextBtn = useRef(null);

  function handleUserContextMenu() {
    const contextClass = contextMenu.current.classList;

    // open context menu
    contextClass.contains('scale-0')
      ? contextClass.replace('scale-0', 'scale-100')
      : contextClass.replace('scale-100', 'scale-0');
  }

  return (
    <nav className="px-3 py-1  font-ssp ">
      {/* search bar */}
      <SearchBar />
      <div className="max-w-screen-xl flex items-center justify-between relative mx-auto">
        {/* logo */}
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="text-xl font-bold">
            <i className="inline-block mr-1 fa-solid fa-kitchen-set text-lg"></i>
            casera
          </Link>
          <i className="text-orange-400 cursor-pointer fa-solid fa-magnifying-glass" />
        </div>
        {/* buttons */}
        <div className="font-roboto flex gap-1 font-extralight items-center text-slate-700">
          <Link
            to="/"
            className="flex flex-col-reverse items-center before:content-[''] before:h-[2px] before:w-0 hover:before:w-full before:duration-200 before:bg-green-300 before:block duration-200 hover:bg-slate-100 active:bg-slate-200 py-1 px-2"
          >
            Home
          </Link>
          <Link
            to="/"
            className="flex flex-col-reverse items-center before:content-[''] before:h-[2px] before:w-0 hover:before:w-full before:duration-200 before:bg-green-300 before:block duration-200 hover:bg-slate-100 active:bg-slate-200 py-1 px-2"
          >
            Recipes
          </Link>
          <span
            ref={contextBtn}
            onClick={handleUserContextMenu}
            className="bg-green-200 hover:bg-green-300 active:bg-green-400  cursor-pointer py-1 px-4 rounded duration-200 font-normal"
          >
            User
          </span>
          {/* user context menu */}
          <ul
            ref={contextMenu}
            className="w-72 absolute bg-white right-3 top-10 rounded border-2 border-slate-500 font-normal transform scale-0 origin-top-right duration-300 z-20"
          >
            <li className="py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200">
              <Link to="/">
                Username
                <i className="pl-2 fa-solid fa-user" />
              </Link>
            </li>
            <li className="py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200">
              <Link to="/">
                My Favorites
                <i className="pl-2 fa-solid fa-folder" />
              </Link>
            </li>
            <li className="border-t-2 border-slate-500 py-2 px-2 duration-200 bg-red-400 hover:bg-red-500 active:bg-red-600 text-slate-50">
              <Link to="/">
                Logout
                <i className="pl-2 fa-solid fa-right-from-bracket" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
