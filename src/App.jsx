import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Saved from './pages/saved/Saved';
import Search from './pages/search/Search';
import SinglePage from './pages/singlePage/SinglePage';
import UserPage from './pages/userPage/UserPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { ContextProvider } from './context/Context';

export default function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/search" element={<Search />} />
            <Route path="/recipe/*" element={<SinglePage />} />
            <Route path="/user/*" element={<UserPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}
