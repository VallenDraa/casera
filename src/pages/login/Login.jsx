import Input from '../../components/input/Input';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import Btn from '../../components/btn/Btn';

export default function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(usernameRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mt-36 bg-slate-100 flex items-center justify-center px-2">
        <section className="mx-auto container flex flex-col justify-center items-center px-3">
          <h1 className="w-fit text-4xl font-ssp font-semibold">Login</h1>
          <form
            onSubmit={(e) => handleLogin(e)}
            className="w-full mt-16 space-y-10 max-w-md"
          >
            <Input
              innerRef={usernameRef}
              editMode={true}
              type={'text'}
              id={'Username'}
            />
            <Input
              innerRef={passwordRef}
              editMode={true}
              type={'password'}
              id={'Password'}
            />
            <div className="space-y-3">
              <Btn
                width="100%"
                textSize="lg"
                text="Login"
                bold={true}
                color="green"
              />
              <Link to="/register" className="inline-block w-full">
                <Btn
                  width="100%"
                  textSize="lg"
                  text="Register"
                  bold={true}
                  color="gray"
                />
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
