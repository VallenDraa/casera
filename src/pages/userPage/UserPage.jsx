import Navbar from '../../components/navbar/Navbar';

export default function UserPage() {
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <article className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input type="file" src="" alt="" />
          </form>
        </article>
      </main>
    </>
  );
}
