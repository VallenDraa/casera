import { Link } from 'react-router-dom';
import { useReducer, useRef, useState } from 'react';
import SearchBar from './searchbar/SearchBar';
import { menuReducer } from '../../context/Reducer';
import { MENUACTIONS } from '../../context/Actions';

export default function Navbar() {
  const contextMenu = useRef(null);
  const contextBtn = useRef(null);
  const [searchState, setSearchState] = useState(false);
  const [menuActiveState, dispatch] = useReducer(menuReducer, false);

  let menuStyle = {
    transform: menuActiveState ? 'translate(0)' : 'translate(100%)',
  };

  window.onload = () => {
    return dispatch({ type: MENUACTIONS.close });
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      if (menuActiveState) return;
      dispatch({ type: MENUACTIONS.open });
    }
    //  else {
    //   if (!menuActiveState) return;
    //   dispatch({ type: MENUACTIONS.close });
    // }
  });

  function handleUserContextMenu() {
    const contextClass = contextMenu.current.classList;
    const contextBtnClass = contextBtn.current.children[0].classList;

    // open context menu
    contextClass.contains('scale-0')
      ? contextClass.replace('scale-0', 'scale-100')
      : contextClass.replace('scale-100', 'scale-0');

    // caret handling
    contextBtnClass.contains('rotate-90')
      ? contextBtnClass.remove('rotate-90')
      : contextBtnClass.add('rotate-90');
  }

  return (
    <nav className="p-3 font-ssp">
      {/* search bar */}
      {searchState && (
        <div className="max-w-2xl mx-auto font-roboto">
          <span
            onClick={() => setSearchState(!searchState)}
            className="top-4 p-1 px-2 rounded-t text-red-500 cursor-pointer absolute z-50 bg-white text-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-xmark" />
            Close
          </span>
          <SearchBar />
        </div>
      )}
      <div className="max-w-screen-xl flex items-center justify-between  mx-auto">
        {/* logo */}
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
          <i
            onClick={() => setSearchState(!searchState)}
            className="cursor-pointer fa-solid fa-magnifying-glass"
          />
        </div>
        {/* buttons */}
        <span
          onClick={() => dispatch({ type: MENUACTIONS.open })}
          className="pl-3 cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis-vertical block md:hidden text-2xl " />
        </span>
        <div
          className=" font-roboto top-0 right-0 left-0 sm:left-2/4 h-screen bg-white md:bg-transparent shadow-2xl md:shadow-none md:h-fit fixed md:static md:flex gap-1 font-extralight items-center text-slate-700 z-30"
          style={menuStyle}
        >
          {/* close menu for smaller screen sizes */}
          <div
            onClick={() => dispatch({ type: MENUACTIONS.close })}
            className="flex md:hidden items-center justify-center py-2 px-2 duration-200 bg-red-100 hover:bg-red-200 active:bg-red-300 hover:rounded gap-x-1 text-red-500 font-normal border-b-2 border-red-200 cursor-pointer"
          >
            <p>Close</p>
          </div>
          <Link
            to="/"
            className="flex flex-col-reverse items-center duration-200 hover:bg-slate-100 active:bg-slate-200 py-1 px-2"
          >
            Home
          </Link>
          <Link
            to="/"
            className="flex flex-col-reverse items-center duration-200 hover:bg-slate-100 active:bg-slate-200 py-1 px-2"
          >
            Recipes
          </Link>
          <span
            ref={contextBtn}
            onClick={handleUserContextMenu}
            className="cursor-pointer py-1 px-2 rounded duration-200 flex items-center justify-center gap-[5px] "
          >
            User{' '}
            <div className="duration-200 border-t-[10px] border-slate-700 border-x-[6px] border-x-transparent transform scale-75 relative top-[1px] w-fit rotate-90"></div>
          </span>
          {/* user context menu */}
          <ul
            ref={contextMenu}
            className="w-full md:w-72 absolute border-t-2 md:border-0 bg-white right-0 md:right-3 md:top-10 md:rounded font-normal transform scale-0 origin-top md:origin-top-right duration-300 z-20"
          >
            <li className="py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200 hover:rounded">
              <Link to="/" className="inline-block w-full">
                Username
                <i className="pl-2 fa-solid fa-user" />
              </Link>
            </li>
            <li className="py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200">
              <Link to="/saved" className="inline-block w-full">
                Saved Recipes
                <i className="pl-2 fa-solid fa-heart" />
              </Link>
            </li>
            <li className="md:rounded-b border-t-2 border-slate-700 py-2 px-2 duration-200 bg-red-500 hover:bg-red-600 active:bg-red-700 text-slate-50">
              <Link className="font-semibold w-full inline-block" to="/">
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
