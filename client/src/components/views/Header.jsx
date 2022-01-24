import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef, useEffect, useCallback } from "react";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import PrivateBoardCreateModal from "./PrivateBoardCreateModal";
import { useSelector, useDispatch } from "react-redux";
import { getPublicBoards } from "../../redux/modules/publicBoards";
import { getPrivateBoards } from "../../redux/modules/privateBoards";

export default function Header() {
  // Todo: 로그인, 유저정보 구현 후 적용 + sign out
  const isSignIn = true;
  const weMetOn = 1000;
  const couple_id = 1;

  const navRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(navRef, false);
  const click = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive, setIsActive]);

  const publicBoards = useSelector((state) => state.publicBoards);
  const privateBoards = useSelector((state) => state.privateBoards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublicBoards());
  }, [dispatch]);

  useEffect(() => {
    if (couple_id) {
      dispatch(getPrivateBoards(couple_id));
    }
  }, [dispatch, couple_id]);

  return (
    <div className="bg-hibye-10 h-16">
      <div className="inner p-4">
        <GiHamburgerMenu className={`text-3xl absolute left-4 cursor-pointer ${isActive ? "text-hibye-60" : "text-hibye-80"}`} onClick={click} />
        <div ref={navRef} className="absolute top-16">
          {isActive ? <Navbar click={click} publicBoards={publicBoards} privateBoards={privateBoards} couple_id={couple_id} /> : null}
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
