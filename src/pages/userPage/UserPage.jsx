import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import handleSave from '../../handleSave/handleSave';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import ThreeInput from '../../components/input/ThreeInput';

export default function UserPage() {
  const [editMode, setEditMode] = useState(false);
  const style = {
    backgroundSize: 'cover',
    background: "url('https://source.unsplash.com/random/')",
    position: 'relative',
    borderRadius: '8px',
    minWidth: '100%',
    maxWidth: '448px',
    fontFamily: "'Source Serif Pro',serif",
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="bg-slate-100">
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          {/* user data */}
          <form
            className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start "
            action=""
            onSubmit={(e) => handleSubmit(e)}
          >
            {/* profile picture */}
            <section className="md:sticky top-5">
              <div className="group relative h-52 w-52 md:h-44 md:w-44 ">
                {editMode && (
                  <label
                    htmlFor="img"
                    className="inset-0 absolute rounded-full opacity-0 group-hover:opacity-100 bg-black/50 duration-200 flex items-center justify-center text-slate-200 font-roboto gap-3 cursor-pointer"
                  >
                    Change Picture
                    <i className="fa-solid fa-image" />
                  </label>
                )}
                <img
                  src="https://source.unsplash.com/random/"
                  alt=""
                  className="h-52 w-52 md:h-44 md:w-44 rounded-full object-cover"
                />
              </div>
              <input id="img" type="file" className="hidden" />
            </section>
            {/* data */}
            <section className="w-full space-y-5">
              <header className="flex items-center justify-between">
                <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
                  My Profile
                </h1>
                <div
                  onClick={() => setEditMode(!editMode)}
                  className="cursor-pointer rounded p-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 duration-200 text-white font-roboto relative text-xs"
                >
                  <i className="fa-solid fa-pen-to-square relative bottom-[2px]" />
                  <p>Edit Profile</p>
                </div>
              </header>
              {/* main form */}
              <main className="space-y-5">
                {/* username */}
                <div className="flex flex-col w-full text-lime-600 font-ssp">
                  <Input editMode={editMode} type={'text'} id={'Username'} />
                </div>
                {/* tel */}
                <div className="flex flex-col w-full text-lime-600 font-ssp">
                  <Input editMode={editMode} type={'tel'} id={'Phone'} />
                </div>
                {/* hobby */}
                <div className="flex flex-col w-full text-lime-600 font-ssp">
                  <ThreeInput editMode={editMode} />
                </div>
              </main>
              <footer>
                {editMode && (
                  <div className="cursor-pointer w-full rounded p-2 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:bg-green-700 uration-200 text-white font-roboto relative text-lg duration-200">
                    <i className="fa-solid fa-floppy-disk" />
                    <span>Save Edit</span>
                  </div>
                )}
              </footer>
            </section>
          </form>
        </div>
      </main>
      <footer className="pb-5 bg-slate-100">
        <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
          {/* saved preview */}
          <h2 className="text-center tracking-wide text-2xl font-ssp first-letter:text-3xl font-semibold mb-2">
            Saved Preview
          </h2>
          <Swiper
            className="w-full h-[650px] cursor-grab"
            spaceBetween={50}
            slidesPerView={1}
          >
            <SwiperSlide style={style}>
              <div
                className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
  font-bold"
              >
                {/* favorite */}
                <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
                  <i className=" fa-regular fa-heart" />
                  <div
                    onClick={(e) => handleSave(e)}
                    className="absolute z-20 inset-0"
                  ></div>
                  <span className="text-[12px]">Save Dish</span>
                </div>
                {/* category */}
                <ul className="relative ml-2 space-y-2 w-fit text-slate-100 text-sm text-left">
                  {/* meal type */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-bowl-rice  h-3 w-3" />
                    <span className="font-light">Vegetarian</span>
                  </li>
                  {/* origin */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-map-location h-3 w-3" />
                    <span className="font-light">Italian</span>
                  </li>
                </ul>
                {/* name */}
                <div className="font-ssp text-slate-100 mx-2 border-t-2 border-red-500">
                  <Link
                    to="/recipe/1234"
                    className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
                  >
                    <div>
                      <span className="text-2xl font-bold text-slate-200">
                        Spicy
                      </span>{' '}
                      Arrabiata Penne
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </Link>
                  <p className="text-xs font-light italic px-2 mt-1 mb-3 text-slate-300 font-roboto">
                    Pasta, Curry
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={style}>
              <div
                className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
  font-bold"
              >
                {/* favorite */}
                <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
                  <i className=" fa-regular fa-heart" />
                  <div
                    onClick={(e) => handleSave(e)}
                    className="absolute z-20 inset-0"
                  ></div>
                  <span className="text-[12px]">Save Dish</span>
                </div>
                {/* category */}
                <ul className="relative ml-2 space-y-2 w-fit text-slate-100 text-sm text-left">
                  {/* meal type */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-bowl-rice  h-3 w-3" />
                    <span className="font-light">Vegetarian</span>
                  </li>
                  {/* origin */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-map-location h-3 w-3" />
                    <span className="font-light">Italian</span>
                  </li>
                </ul>
                {/* name */}
                <div className="font-ssp text-slate-100 mx-2 border-t-2 border-red-500">
                  <Link
                    to="/recipe/1234"
                    className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
                  >
                    <div>
                      <span className="text-2xl font-bold text-slate-200">
                        Spicy
                      </span>{' '}
                      Arrabiata Penne
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </Link>
                  <p className="text-xs font-light italic px-2 mt-1 mb-3 text-slate-300 font-roboto">
                    Pasta, Curry
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={style}>
              <div
                className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
  font-bold"
              >
                {/* favorite */}
                <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
                  <i className=" fa-regular fa-heart" />
                  <div
                    onClick={(e) => handleSave(e)}
                    className="absolute z-20 inset-0"
                  ></div>
                  <span className="text-[12px]">Save Dish</span>
                </div>
                {/* category */}
                <ul className="relative ml-2 space-y-2 w-fit text-slate-100 text-sm text-left">
                  {/* meal type */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-bowl-rice  h-3 w-3" />
                    <span className="font-light">Vegetarian</span>
                  </li>
                  {/* origin */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-map-location h-3 w-3" />
                    <span className="font-light">Italian</span>
                  </li>
                </ul>
                {/* name */}
                <div className="font-ssp text-slate-100 mx-2 border-t-2 border-red-500">
                  <Link
                    to="/recipe/1234"
                    className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
                  >
                    <div>
                      <span className="text-2xl font-bold text-slate-200">
                        Spicy
                      </span>{' '}
                      Arrabiata Penne
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </Link>
                  <p className="text-xs font-light italic px-2 mt-1 mb-3 text-slate-300 font-roboto">
                    Pasta, Curry
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={style}>
              <div
                className="duration-300 shadow-inner absolute inset-0 opacity-0 hover:opacity-100 rounded-lg w-full h-full bg-gradient-to-b from-neutral-500/40 to-neutral-900/60 flex flex-col justify-between
  font-bold"
              >
                {/* favorite */}
                <div className="cursor-pointer w-fit rounded-tl-lg rounded-bl-none rounded-br-lg p-2 flex items-center gap-1 bg-red-500 hover:bg-red-600 duration-200 text-white font-roboto relative">
                  <i className=" fa-regular fa-heart" />
                  <div
                    onClick={(e) => handleSave(e)}
                    className="absolute z-20 inset-0"
                  ></div>
                  <span className="text-[12px]">Save Dish</span>
                </div>
                {/* category */}
                <ul className="relative ml-2 space-y-2 w-fit text-slate-100 text-sm text-left">
                  {/* meal type */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-bowl-rice  h-3 w-3" />
                    <span className="font-light">Vegetarian</span>
                  </li>
                  {/* origin */}
                  <li className="flex items-center gap-3 rounded-full">
                    <i className="fa-solid fa-map-location h-3 w-3" />
                    <span className="font-light">Italian</span>
                  </li>
                </ul>
                {/* name */}
                <div className="font-ssp text-slate-100 mx-2 border-t-2 border-red-500">
                  <Link
                    to="/recipe/1234"
                    className="text-lg font-semibold mt-1 p-2 flex items-center justify-between duration-200 rounded hover:bg-slate-400/50"
                  >
                    <div>
                      <span className="text-2xl font-bold text-slate-200">
                        Spicy
                      </span>{' '}
                      Arrabiata Penne
                    </div>
                    <i className="fa-solid fa-ellipsis-vertical" />
                  </Link>
                  <p className="text-xs font-light italic px-2 mt-1 mb-3 text-slate-300 font-roboto">
                    Pasta, Curry
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </footer>
    </>
  );
}
