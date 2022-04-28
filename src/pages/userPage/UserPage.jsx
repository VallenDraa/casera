import 'swiper/css';
import 'swiper/css/pagination';
import LoginFirst from '../../components/errorComps/LoginFirst';
import Header from '../../components/header/Header';
import Input from '../../components/input/Input';
import Field from '../../components/fields/Field';
import Lists from '../../components/fields/Lists';
import ThreeInput from '../../components/input/ThreeInput';
import Btn from '../../components/btn/Btn';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  loadingContext,
  toastContext,
  userContext,
} from '../../context/Context';
import { USERACTIONS } from '../../context/Actions';
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
  const { setToastData } = useContext(toastContext);
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useContext(loadingContext);
  const { username } = useParams(); //get the queried username from the URL parameter
  const [otherUserData, setOtherUserData] = useState(null);
  const [isGuest, setIsGuest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const getPPCurrentUser = () => {
      // returns if there is userState is empty

      if (!userState) return;
      setProfilePic(userState.profilePic);
    };

    const fetchOtherUser = async (username) => {
      try {
        const { data } = await axios.get(`/api/user/get?username=${username}`);
        return data;
      } catch (err) {
        setToastData({ ok: false, msg: 'Fail To Make Connection !' });
      }
    };

    // function to check if the user provided a URL parameter to the "/user/*" link
    const redirectIfLoggedIn = (urlParam) => {
      return new Promise((res, rej) => {
        if (!urlParam) {
          res(navigate(`/user/${userState.username}`));
        } else {
          rej('the user provided a url parameter');
        }
      });
    };

    const funcsForSameUser = () => {
      getPPCurrentUser();
      fetchSavedRecipes(userState, setLoading, true)
        .then((recipes) => {
          if (!recipes) return setLoading(false);
          setRecipes(recipes);
        })
        .finally(() => setLoading(false));
    };

    const funcsForNotSameUser = () => {
      fetchOtherUser(username)
        .then(({ userData }) => {
          setOtherUserData(userData);
          setProfilePic(userData.profilePic);
        })
        .finally(() => setLoading(false));
    };

    setStatePro(setOtherUserData, null).finally(() => {
      setStatePro(setIsGuest, userState ? false : true).finally(() => {
        // check if user logged in
        if (!isGuest) {
          if (!userState) return;

          redirectIfLoggedIn(username)
            // get user data using the current userState because the code redirects the page to the current user's page
            .then(() => funcsForSameUser())
            // no redirect. Check if the requested user is the same as the current logged in user
            .catch(() => {
              userState.username === username
                ? funcsForSameUser()
                : funcsForNotSameUser();
            });
        }
        // the user is a guest
        else {
          // check if a URL parameter is provided
          username ? funcsForNotSameUser() : setIsGuest(true);
          return setLoading(false);
        }
      });
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

  // convert uploaded pp to data url/base64
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
      <>
        <Header />
        {loading ? (
          <main
            className="relative"
            style={{ height: loading ? 'calc(100vh - 70px)' : 'auto' }}
          >
            <Loading />
          </main>
        ) : (
          <main className="animate-fade-in">
            {!otherUserData ? ( // if the requested user is not the current user
              userState ? ( // check if the user is logged in, then render user's own user page
                <>
                  <section className="bg-slate-100">
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
                                    {profilePic
                                      ? 'Change Picture'
                                      : 'Set Picture'}
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
                          {/* form */}
                          <section className="space-y-5">
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
                          </section>
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
                  </section>
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
              ) : (
                isGuest && (
                  // the user is a guest and trying to access its own user page
                  <section className="h-[calc(100vh-120px)] relative max-w-screen-xl px-3 mt-10 sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto flex justify-center items-center">
                    <LoginFirst msg="Login / Register To See Your User Page !" />
                  </section>
                )
              )
            ) : (
              // if the requested user is the current user
              <section className="bg-slate-100 flex justify-center items-center h-[calc(100vh-55px)]">
                <div className="relative max-w-screen-xl px-3 mt-10 w-full sm:w-11/12 lg:w-5/6 xl:w-3/4 mx-auto lg:text-left">
                  {/* user data */}
                  <article className="flex flex-col gap-12 md:gap-20 items-center">
                    {/* profile picture */}
                    <section className="md:sticky top-5">
                      <div className="text-center">
                        <div className="group relative h-52 w-52 md:h-60 md:w-60">
                          {profilePic ? (
                            <img
                              src={profilePic}
                              alt=""
                              className="h-52 w-52 md:h-60 md:w-60 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex justify-center items-center h-52 w-52 md:h-60 md:w-60 rounded-full bg-slate-200">
                              <i className="fa-solid fa-user text-9xl text-slate-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                    {/* data */}
                    <section className="w-full space-y-5">
                      <header className="flex items-center justify-between">
                        <h1 className="tracking-wide text-4xl font-ssp first-letter:text-5xl first-letter:font-semibold">
                          {`${otherUserData.username}'s Profile`}
                        </h1>
                      </header>
                      <footer className="space-y-5">
                        {/* username */}
                        <Field name="Username" value={otherUserData.username} />
                        {/* tel */}
                        <Field name="Telephone" value={otherUserData.phone} />
                        {/* hobby */}
                        <Lists name="Hobbies" values={otherUserData.hobby} />
                      </footer>
                    </section>
                  </article>
                </div>
              </section>
            )}
          </main>
        )}
      </>
    </>
  );
}
