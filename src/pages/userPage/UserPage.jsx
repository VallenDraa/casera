import { useContext, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from '../../components/navbar/Navbar';
import Input from '../../components/input/Input';
import ThreeInput from '../../components/input/ThreeInput';
import Btn from '../../components/btn/Btn';
import {
  loadingContext,
  toastContext,
  userContext,
} from '../../context/Context';
import { USERACTIONS } from '../../context/Actions';
import StateToast from '../../components/toast/StateToast';
import axios from 'axios';
import { setStatePro } from '../../utils/utils';
import Slides from '../../components/slides/Slides';
import Loading from '../../components/loading/Loading';
import EmptySlides from '../../components/slides/EmptySlides';
import { fetchSavedRecipes } from '../../fetch/fetchRecipeFromServer';

export default function UserPage() {
  const [editMode, setEditMode] = useState(false);
  const { userState, dispatch } = useContext(userContext);
  const [profilePic, setProfilePic] = useState(null);
  const { toastData, setToastData } = useContext(toastContext);
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useContext(loadingContext);

  useEffect(() => {
    setLoading(true);
    // will fetch profile picture from session storage
    const getPP = () => {
      // returns if there is userState is empty

      if (!userState) return;
      setProfilePic(userState.profilePic);
    };

    getPP();
    fetchSavedRecipes(userState, setLoading, true).then((recipes) => {
      if (!recipes) return setLoading(false);

      setRecipes(recipes);
    });
  }, [userState]);

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
      {loading && <Loading />}
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
                            <i className="fa-solid fa-image" />
                            {profilePic ? 'Change Picture' : 'Set Picture'}
                          </label>
                          <button
                            type="button"
                            onClick={() => setProfilePic(null)}
                            className="duration-300 p-2 hover:bg-red-300/40 rounded cursor-pointer flex items-center justify-center gap-3 w-2/3"
                          >
                            <i className="fa-solid fa-trash" />
                            Delete Picture
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
          <footer className=" bg-slate-100">
            <div className="relative max-w-screen-xl px-3 pt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
              {recipes ? (
                <div className="pb-5 pt-10 max-w-xl mx-auto text-center space-y-3">
                  <p className="tracking-wide text-2xl font-ssp first-letter:text-3xl first-letter:font-semibold">
                    Saved Recipes Preview
                  </p>
                  <Slides recipes={recipes} />
                </div>
              ) : (
                <EmptySlides msg="You Don't Have Any Saved Recipes" />
              )}
            </div>
          </footer>
        </>
      )}
    </>
  );
}
