import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Saved from './pages/saved/Saved';
import Search from './pages/search/Search';
import SinglePage from './pages/singlePage/SinglePage';
import UserPage from './pages/userPage/UserPage';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/*" element={<SinglePage />} />
          <Route path="/user/*" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
