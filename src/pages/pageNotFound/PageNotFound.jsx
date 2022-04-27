import Header from '../../components/header/Header';
import Missing404 from '../../components/errorComps/Missing404';

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto">
          <Missing404 msg="The Page You Were Looking For Cannot Be Found !" />
        </div>
      </main>
    </>
  );
}
