import Navbar from '../../components/navbar/Navbar';

export default function Search() {
  const query = window.location.href.split('=')[1];
  console.log(query);
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left pb-5">
        <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
          Result for <span className="italic">{query}</span>
        </h1>
        <p className="font-ssp text-lg font-light">There are 50 recipes</p>
      </main>
    </>
  );
}
