import Navbar from '../../components/navbar/Navbar';
import HomeAside from '../../components/home/homeAside/HomeAside';
import CardWrapper from '../../components/card/CardWrapper';

export default function Saved() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
            Saved
          </h1>
          <p className="font-ssp text-lg font-light">
            Cook Your <span className="font-semibold">Favorites !</span>
          </p>
          <article className="mt-16 ">
            <section className="sticky top-1/2">
              <HomeAside />
            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 pb-5">
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
              <CardWrapper saved={true} />
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
