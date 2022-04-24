import { useContext, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import ThreeInput from '../../components/input/ThreeInput';
import Btn from '../../components/btn/Btn';
import { toastContext, userContext } from '../../context/Context';
import { USERACTIONS } from '../../context/Actions';
import StateToast from '../../components/toast/StateToast';
import axios from 'axios';
import { changeToSave, changeToSaved } from '../../handleSave/handleSave';
import { setStatePro } from '../../utils/utils';

export default function UserPage() {
  const [editMode, setEditMode] = useState(false);
  const { userState, dispatch } = useContext(userContext);
  const [profilePic, setProfilePic] = useState(null);
  const { toastData, setToastData } = useContext(toastContext);

  const style = {
    backgroundSize: 'cover',
    background: "url('https://source.unsplash.com/random/')",
    position: 'relative',
    borderRadius: '8px',
    minWidth: '100%',
    maxWidth: '448px',
    fontFamily: "'Source Serif Pro',serif",
  };

  useEffect(() => {
    // will fetch profile picture from
    const getPP = () =>
      sessionStorage.getItem('user') &&
      setProfilePic(JSON.parse(sessionStorage.getItem('user')).profilePic);

    getPP();
  }, []);

  const handleSubmit = async (e) => {
    setToastData(null);
    e.preventDefault();

    // get the inputs
    const [, name, phone, hob1, hob2, hob3] =
      e.target.querySelectorAll('input');

    // set the body content
    const bodyContent = {
      _id: userState._id,
      username: name.value,
      phone: phone.value,
      hobby: [hob1.value, hob2.value, hob3.value],
      profilePic,
    };

    // update user in database
    try {
      const { data } = await axios.put('/api/user/update', bodyContent);
      dispatch({ type: USERACTIONS.updateUser, payload: data.userData });
      // console.log(data);
      setToastData({ ok: true, msg: 'Profile Updated !' });
    } catch (e) {
      setToastData({ ok: false, msg: 'Fail To Make Connection !' });
    }
  };

  // handle file type
  const checkFileType = (type) => {
    switch (type) {
      case 'image/png':
        return true;
      case 'image/jpeg':
        return true;
      default:
        return false;
    }
  };

  // convert uploaded pp to data url
  const handlePP = (img) => {
    setStatePro(setToastData, null).finally(() => {
      // if img is empty/ undefined
      if (!img) return;

      // check if file type is supported
      const supported = checkFileType(img.type);

      if (supported) {
        // check the img size
        if (img.size > 300000)
          return setToastData({
            ok: false,
            msg: 'The Picture is > 400kb, Please Choose Another Picture !',
          });

        // set img to the file reader
        const reader = new FileReader();
        reader.readAsDataURL(img);

        // set PP state to display image
        reader.onload = () => setProfilePic(reader.result);
      } else {
        return setToastData({
          ok: false,
          msg: 'The File Type Must Be (.PNG, .JPG, or .JPEG)',
        });
      }
    });
  };

  return (
    <>
      {toastData && <StateToast payload={toastData} />}

      {userState && (
        <>
          <header>
            <Navbar />
          </header>
          <main className="bg-slate-100">
            <div className="relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
              {/* user data */}
              <form
                className="flex flex-col md:flex-row gap-12 md:gap-20 items-center md:items-start"
                onSubmit={(e) => handleSubmit(e)}
              >
                {/* profile picture */}
                <section className="md:sticky top-5">
                  <div className="text-center">
                    <div className="group relative h-52 w-52">
                      {editMode && (
                        <div className="inset-0 absolute rounded-full opacity-0 group-hover:opacity-100 bg-black/50 duration-200 flex flex-col items-center justify-center text-slate-200 font-roboto gap-3 text-sm">
                          <label
                            htmlFor="img"
                            className="duration-300 p-2 hover:bg-slate-100/30 rounded cursor-pointer flex items-center justify-center gap-3 w-2/3"
                          >
                            {profilePic ? 'Change Picture' : 'Set Picture'}
                            <i className="fa-solid fa-image" />
                          </label>
                          <button
                            type="button"
                            onClick={() => setProfilePic(null)}
                            className="duration-300 p-2 hover:bg-red-300/40 rounded cursor-pointer flex items-center justify-center gap-3 w-2/3"
                          >
                            Delete Picture
                            <i className="fa-solid fa-trash" />
                          </button>
                        </div>
                      )}

                      {profilePic ? (
                        <img
                          src={profilePic}
                          alt=""
                          className="h-52 w-52 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex justify-center items-center h-52 w-52 rounded-full bg-slate-200">
                          <i className="fa-solid fa-user text-9xl text-slate-400" />
                        </div>
                      )}
                    </div>
                    {editMode && (
                      <p className="font-roboto text-[10px] text-lime-600 mt-2">
                        *Picture Max Size 400kb
                      </p>
                    )}
                  </div>
                  <input
                    onChange={(e) => handlePP(e.target.files[0])}
                    id="img"
                    type="file"
                    className="hidden"
                  />
                </section>
                {/* data */}
                <section className="w-full space-y-5">
                  <header className="flex items-center justify-between">
                    <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
                      My Profile
                    </h1>
                    <div onClick={() => setEditMode(!editMode)}>
                      <Btn
                        text="Edit Profile"
                        color="orange"
                        textSize="xs"
                        icon={
                          <i className="fa-solid fa-pen-to-square relative bottom-[2px]" />
                        }
                      />
                    </div>
                  </header>
                  {/* main form */}
                  <main className="space-y-5">
                    {/* username */}
                    <Input
                      editMode={editMode}
                      type={'text'}
                      id={'Username'}
                      value={userState.username}
                    />
                    {/* tel */}
                    <Input
                      editMode={editMode}
                      type={'tel'}
                      id={'Telephone'}
                      value={userState.phone}
                    />
                    {/* hobby */}
                    <ThreeInput
                      label={'Hobby'}
                      editMode={editMode}
                      value={userState.hobby}
                    />
                  </main>
                  <footer>
                    {editMode && (
                      <Btn
                        type="submit"
                        width="100%"
                        text="Save Changes"
                        color="green"
                        textSize="lg"
                        icon={<i className="fa-solid fa-floppy-disk" />}
                      />
                    )}
                  </footer>
                </section>
              </form>
            </div>
          </main>
          <footer className="pb-5 bg-slate-100">
            <div className="relative max-w-screen-xl px-3 pt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
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
                        onClick={(e) => changeToSaved(e)}
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
      )}
    </>
  );
}
