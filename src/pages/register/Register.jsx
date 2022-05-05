import Input from '../../components/input/Input';
import Header from '../../components/header/Header';
import { Link, useNavigate } from 'react-router-dom';
import Btn from '../../components/btn/Btn';
import { useContext, useRef } from 'react';
import { toastContext } from '../../context/Context';
import axios from 'axios';

export default function Register() {
  const { setToastData } = useContext(toastContext);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  // handle register
  const handleRegister = async (e) => {
    setToastData(null);
    e.preventDefault();
    const bodyContent = {
      email: emailRef.current.value,
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };

    // try to register
    try {
      const { data } = await axios.post('/auth/register', bodyContent);
      data.signup ? navigate('/login') : setToastData(data);
    } catch (e) {
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    }
  };
  return (
    <>
      <Header />
      <main className="h-[calc(100vh-70px)] flex items-center justify-center px-2 text-slate-800">
        <section className="relative mx-auto container flex flex-col justify-center items-center px-3">
          <h1 className="w-fit text-4xl font-ssp font-semibold">Register</h1>
          <form
            onSubmit={(e) => handleRegister(e)}
            className="w-full mt-16 space-y-10 max-w-md"
          >
            <Input
              forAuth={true}
              innerRef={emailRef}
              editMode={true}
              type={'email'}
              id={'Email'}
            />
            <Input
              forAuth={true}
              innerRef={usernameRef}
              editMode={true}
              type={'text'}
              id={'Username'}
            />
            <Input
              forAuth={true}
              innerRef={passwordRef}
              editMode={true}
              type={'password'}
              id={'Password'}
            />
            <div className="space-y-3">
              <Btn
                type="submit"
                width="100%"
                textSize="lg"
                text="Register"
                color="green"
                bold={true}
              />
              <div className="text-xs space-x-1 text-center text-slate-500">
                <span>Already have an Account ?</span>
                <Link
                  to="/login"
                  className="text-orange-400 hover:text-orange-500 active:text-orange-600 underline underline-offset-2"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
