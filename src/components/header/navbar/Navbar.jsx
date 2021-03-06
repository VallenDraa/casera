import { Link } from 'react-router-dom';
import SearchBar from './searchbar/SearchBar';
import { useRef, useState } from 'react';
import ContextMenu from './contextMenu/ContextMenu';
import Logo from './logo/Logo';
import Caret from './caret/Caret';

export default function Navbar() {
  const menu = useRef(null);
  const contextMenu = useRef(null);
  const contextBtn = useRef(null);
  const [searchState, setSearchState] = useState(false);

  // turn menu into mobile version or desktop version depending on the screen size
  const morphMenu = () => {
    if (!menu.current) return;

    const menuComp = menu.current;

    // menu will be full screen when the screen size is <=768
    window.innerWidth >= 768
      ? (menuComp.style = 'transform:translate(0)')
      : (menuComp.style = 'transform:translate(100%)');

    // remove animation class
    menuComp.classList.contains('animate-menu-o')
      ? menuComp.classList.remove('animate-menu-o')
      : menuComp.classList.remove('animate-menu-c');
  };
  window.addEventListener('resize', morphMenu);

  // handle menu auto-close
  window.addEventListener('click', (e) => {
    if (!contextMenu.current || !contextBtn.current) return;
    const ctxMenu = contextMenu.current;
    const ctxBtn = contextBtn.current;
    const ctxMenuItems = [...contextMenu.current.children];

    // check if the clicked target is related to the context menu
    if (
      ctxMenuItems.includes(e.target) ||
      e.target === ctxMenu ||
      e.target === ctxBtn
    ) {
      return;
    } else {
      const ctxMenuClasses = ctxMenu.classList;
      const caret = ctxBtn.children[0].classList;

      // check if the context menu is already closed, if yes then return
      if (ctxMenuClasses.contains('scale-0')) return;

      // scale down the context menu
      ctxMenuClasses.replace('scale-100', 'scale-0');
      // add closing animation
      ctxMenuClasses.replace('animate-scale-in', 'animate-scale-out');
      // rotate caret
      caret.add('rotate-90');
    }
  });

  function handleUserContextMenu() {
    const contextClass = contextMenu.current.classList;
    const caret = contextBtn.current.children[0].classList;

    // open context menu
    contextClass.contains('scale-0')
      ? contextClass.replace('scale-0', 'scale-100')
      : contextClass.replace('scale-100', 'scale-0');

    // context menu is opened and has been closed before
    if (
      contextClass.contains('animate-scale-in') &&
      !contextClass.contains('animate-scale-out')
    ) {
      contextClass.replace('animate-scale-in', 'animate-scale-out');
    }
    // context menu is closed and has been opened before
    else if (
      !contextClass.contains('animate-scale-in') &&
      contextClass.contains('animate-scale-out')
    ) {
      contextClass.replace('animate-scale-out', 'animate-scale-in');
    }
    // context menu has never been opened before
    else {
      contextClass.add('animate-scale-in');
    }

    // caret handling
    caret.contains('rotate-90')
      ? caret.remove('rotate-90')
      : caret.add('rotate-90');
  }

  return (
    <nav className="px-3 pt-3 font-ssp">
      {/* search bar */}
      {searchState && (
        <div className="max-w-2xl mx-auto font-roboto">
          <span
            onClick={() => setSearchState(false)}
            className="top-4 py-1 px-2 rounded-t text-red-500 cursor-pointer fixed z-50 bg-white text-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-xmark" />
            Close
          </span>
          <SearchBar />
        </div>
      )}
      <div className="max-w-screen-xl flex items-center justify-between  mx-auto">
        <div className="flex justify-between items-center gap-4">
          {/* logo */}
          <Logo />
          {/* search btn */}
          <i
            onClick={() => setSearchState(!searchState)}
            className="text-slate-700 cursor-pointer fa-solid fa-magnifying-glass"
          />
        </div>
        {/* open menu button */}
        <span
          onClick={() => {
            menu.current.style = 'transform:translate(0)';
            menu.current.classList.contains('animate-menu-c')
              ? menu.current.classList.replace(
                  'animate-menu-c',
                  'animate-menu-o'
                )
              : menu.current.classList.add('animate-menu-o');
          }}
          className="pl-3 cursor-pointer"
        >
          <i className="fa-solid fa-ellipsis-vertical block md:hidden text-2xl " />
        </span>

        {/* the menu itself */}
        <div
          ref={menu}
          className="z-100 transform translate-x-full md:translate-x-0 font-roboto top-0 right-0 left-0 sm:left-2/4 h-screen bg-white md:bg-transparent md:h-fit fixed md:static md:flex gap-1 font-extralight items-center text-slate-700 z-30 shadow-xl md:shadow-none"
        >
          {/* close menu for smaller screen size */}
          <div
            onClick={() => {
              menu.current.style = 'transform:translate(100%)';
              menu.current.classList.contains('animate-menu-o')
                ? menu.current.classList.replace(
                    'animate-menu-o',
                    'animate-menu-c'
                  )
                : menu.current.classList.add('animate-menu-c');
            }}
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
          <span
            ref={contextBtn}
            onClick={handleUserContextMenu}
            className="cursor-pointer py-1 px-2 rounded duration-200 flex items-center justify-center gap-[5px] "
          >
            User
            <Caret />
          </span>
          {/* user context menu */}
          <ContextMenu innerRef={contextMenu} />
        </div>
      </div>
    </nav>
  );
}
