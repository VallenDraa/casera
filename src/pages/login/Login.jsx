import Input from '../../components/input/Input';
import Navbar from '../../components/navbar/Navbar';
import { useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../context/Context';
import { toastContext } from '../../context/Context';
import StateToast from '../../components/toast/StateToast';
import { USERACTIONS } from '../../context/Actions';
import axios from 'axios';
import Btn from '../../components/btn/Btn';

export default function Login() {
  const { userState, dispatch } = useContext(userContext);
  const { toastData, setToastData } = useContext(toastContext);
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    setToastData(null);
    e.preventDefault();
    const bodyContent = {
      username: usernameRef.current.value || null,
      loginPassword: passwordRef.current.value || null,
    };

    try {
      const { data } = await axios.post('/auth/login', bodyContent);
      if (data.login) {
        dispatch({ type: USERACTIONS.LoginSuccess, payload: data.userData });
        navigate('/');
        console.log(userState);
      } else {
        setToastData(data);
      }
    } catch (e) {
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    }
  };

  return (
    <>
      {toastData && <StateToast payload={toastData} />}
      <header>
        <Navbar />
      </header>
      <main className="h-[calc(100vh-70px)] bg-slate-100 flex items-center justify-center px-2 text-slate-800">
        <section className="mx-auto container flex flex-col justify-center items-center px-3">
          <h1 className="w-fit text-4xl font-ssp font-semibold">Login</h1>
          <form
            onSubmit={(e) => handleLogin(e)}
            className="w-full mt-16 space-y-10 max-w-md"
          >
            <Input
              forAuth={true}
              innerRef={usernameRef}
              editMode={true}
              type={'text'}
              id={'Username'}
            />
            <div className="relative">
              <Link
                to="/login"
                className="font-roboto absolute text-[11px] text-orange-400 hover:text-orange-500 active:text-orange-600 underline underline-offset-2 right-2 top-0"
              >
                Forgot Password
              </Link>
              <Input
                forAuth={true}
                innerRef={passwordRef}
                editMode={true}
                type={'password'}
                id={'Password'}
              />
            </div>
            <div className="space-y-3">
              <Btn
                type="submit"
                onClick={() => setToastData(null)}
                textSize="lg"
                text="Login"
                bold={true}
                color="green"
              />
              <div className="text-xs space-x-1 text-center text-slate-500 font-roboto">
                <span>Don't have an Account ?</span>
                <Link
                  to="/register"
                  className="text-orange-400 hover:text-orange-500 active:text-orange-600 underline underline-offset-2 "
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
