import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Saved from './pages/saved/Saved';
import Search from './pages/search/Search';
import SinglePage from './pages/singlePage/SinglePage';
import UserPage from './pages/userPage/UserPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import PageNotFound from './pages/pageNotFound/PageNotFound';
import { useContext, useEffect } from 'react';
import { USERACTIONS } from './context/Actions';
import { toastContext, userContext } from './context/Context';
import StateToast from './components/toast/StateToast';

export default function App() {
  const { dispatch } = useContext(userContext);
  useEffect(() => dispatch({ type: USERACTIONS.getUserData }), [dispatch]);
  const { toastData } = useContext(toastContext);

  return (
    <>
      {toastData && <StateToast payload={toastData} />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:idMeal" element={<SinglePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
