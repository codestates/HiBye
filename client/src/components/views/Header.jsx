import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef } from "react";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import { useCallback } from "react";
import PrivateBoardCreateModal from "./PrivateBoardCreateModal";

export default function Header() {
  // Todo: Sign in 기능과 커플 매칭 구현 후 변수에 할당
  const isSignIn = true;
  const weMetOn = 1000;

  const navRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(navRef, false);
  const click = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive, setIsActive]);

  return (
    <div className="bg-hibye-10 h-16">
      <div className="inner p-4">
        <GiHamburgerMenu className={`text-3xl absolute left-4 cursor-pointer ${isActive ? "text-hibye-60" : "text-hibye-80"}`} onClick={click} />
        <div ref={navRef} className="absolute top-16">
          {isActive ? <Navbar click={click} /> : null}
        </div>
        <Link to="/" className="text-hibye-80 text-3xl font-bold absolute left-1/2 -translate-x-2/4">
          HiBye
        </Link>
        <div className="flex absolute right-4">
          {isSignIn ? (
            <>
              {weMetOn ? (
                <div className="pt-1">
                  <span className="text-hibye-60 text-base font-bold mr-1">♡</span>
                  <span className="text-hibye-60 text-base">{weMetOn}</span>
                  <span className="text-hibye-60 text-sm font-bold ml-1">Days</span>
                </div>
              ) : null}
              {/* Todo: Sign out 기능 구현 후 onClick으로 연결 */}
              <button className="button--pink ml-6">Sign Out</button>
              <Link to="./mypage" className="button--pink ml-4">
                My Page
              </Link>
            </>
          ) : (
            <Link to="./signin" className="button--pink">
              Sign In
            </Link>
          )}
        </div>
      </div>
      <PrivateBoardCreateModal />
    </div>
  );
}
