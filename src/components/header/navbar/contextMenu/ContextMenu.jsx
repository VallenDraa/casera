import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userContext } from '../../../../context/Context';
import { USERACTIONS } from '../../../../context/Actions';
import { useNavigate } from 'react-router-dom';

export default function ContextMenu({ innerRef }) {
  const { userState, dispatch } = useContext(userContext);
  const Navigate = useNavigate();

  const logout = () => {
    dispatch({ type: USERACTIONS.Logout });
    Navigate('/');
  };

  return (
    <div
      ref={innerRef}
      id="context-menu"
      className="w-full md:w-72 absolute border-t-2 md:border-0 bg-white right-0 md:right-3 md:top-10 md:rounded font-normal transform scale-0 origin-top md:origin-top-right z-20 md:shadow-md font-roboto"
    >
      {userState ? (
        <>
          <Link
            to={`/user/${userState.username}`}
            className="inline-block w-full py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200"
          >
            {userState.username}
            <i className="pl-2 fa-solid fa-user" />
          </Link>

          <Link
            to="/saved"
            className="inline-block w-full py-2 px-2 duration-200 hover:bg-slate-100 active:bg-slate-200"
          >
            Saved Recipes
            <i className="pl-2 fa-solid fa-heart" />
          </Link>
          <div
            onClick={logout}
            className="md:rounded-b border-t-2 border-slate-700 py-2 px-2 duration-200 bg-red-500 hover:bg-red-600 active:bg-red-700 text-slate-50 font-semibold"
          >
            Logout
            <i className="pl-2 fa-solid fa-right-to-bracket" />
          </div>
        </>
      ) : (
        <>
          <li className=" text-lg text-center text-slate-100 hover:text-slate-200 bg-lime-500 hover:bg-lime-600 active:bg-lime-700 relative">
            <Link className="py-2 px-2 inline-block w-full h-full" to="/login">
              Login
            </Link>
          </li>
          <li className=" text-lg text-center text-slate-100 hover:text-slate-200 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 relative">
            <Link
              className="py-2 px-2 inline-block w-full h-full"
              to="/register"
            >
              Register
            </Link>
          </li>
        </>
      )}
    </div>
  );
}
