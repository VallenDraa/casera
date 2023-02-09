import login from '../../assets/svg/login.svg';
import { Link } from 'react-router-dom';
import Btn from '../btn/Btn';

export default function LoginFirst({ msg }) {
  return (
    <div className="text-slate-700 flex flex-col justify-center items-center sm:items-start">
      <img src={login} alt="" />
      <div className="mt-5">
        <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
          Oops...
        </h1>
        <p className="font-ssp text-lg font-light text-slate-500 ">{msg}</p>
        <Link to="/login" className="mt-5 block w-full sm:w-[250px]">
          <Btn type="button" text="Login Page" style={{ width: '100%' }} />
        </Link>
      </div>
    </div>
  );
}
