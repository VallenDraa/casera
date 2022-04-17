import Input from '../../components/input/Input';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import Btn from '../../components/btn/Btn';

export default function Register() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="mt-36 bg-slate-100 flex items-center justify-center px-2">
        <section className="mx-auto container flex flex-col justify-center items-center px-3">
          <h1 className="w-fit text-4xl font-ssp font-semibold">Register</h1>
          <form className="w-full mt-16 space-y-10 max-w-md">
            <Input editMode={true} type={'email'} id={'Email'} />
            <Input editMode={true} type={'text'} id={'Username'} />
            <Input editMode={true} type={'password'} id={'Password'} />
            <div className="space-y-3">
              <Btn
                width="100%"
                textSize="lg"
                text="Register"
                color="green"
                bold={true}
              />
              <Link to="/login" className="inline-block w-full">
                <Btn
                  width="100%"
                  textSize="lg"
                  text="Login"
                  color="gray"
                  bold={true}
                />
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
