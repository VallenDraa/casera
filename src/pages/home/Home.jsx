import Navbar from '../../components/navbar/Navbar';
import { useEffect } from 'react';
import './Home.css';

import Slides from '../../components/slides/Slides';

export default function Home() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Slides />
      </main>
    </>
  );
}
