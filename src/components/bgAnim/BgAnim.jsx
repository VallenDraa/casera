import Bg1 from '../../assets/svg/bgAnim/bg1.svg';
import Bg2 from '../../assets/svg/bgAnim/bg2.svg';
import Bg3 from '../../assets/svg/bgAnim/bg3.svg';
import Bg4 from '../../assets/svg/bgAnim/bg4.svg';
import Bg5 from '../../assets/svg/bgAnim/bg5.svg';
import Bg6 from '../../assets/svg/bgAnim/bg6.svg';
import Bg7 from '../../assets/svg/bgAnim/bg7.svg';
import Bg8 from '../../assets/svg/bgAnim/bg8.svg';
import Bg9 from '../../assets/svg/bgAnim/bg9.svg';
import Bg10 from '../../assets/svg/bgAnim/bg10.svg';
import { useEffect, useState } from 'react';

export default function BgAnim() {
  const [activeBg, setActiveBg] = useState(null);
  const BG_SETS = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, Bg7, Bg8, Bg9, Bg10];

  useEffect(() => {
    const activeIndex = Math.floor(Math.random() * 10);

    setActiveBg(BG_SETS[activeIndex]);
  }, []);

  return (
    <div className="fixed h-screen w-screen">
      <img
        src={activeBg}
        alt=""
        className="animate-fade-in object-cover min-h-full min-w-full"
      />
    </div>
  );
}
