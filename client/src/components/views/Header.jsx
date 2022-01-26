import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRef, useEffect, useCallback } from "react";
import useDetectOutsideClick from "../../utils/useDetectOutsideClick";
import PrivateBoardCreateModal from "./PrivateBoardCreateModal";
import { useSelector, useDispatch } from "react-redux";
import { getPublicBoards } from "../../redux/modules/publicBoards";
import { getPrivateBoards } from "../../redux/modules/privateBoards";
import { removeUserInfo } from "../../redux/modules/user";

export default function Header() {
  const { id, couple_id, is_matching, d_day } = useSelector((state) => state.user);

  const navRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(navRef, false);
  const click = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive, setIsActive]);

  const publicBoards = useSelector((state) => state.publicBoards);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublicBoards());
  }, [dispatch]);

  const privateBoards = useSelector((state) => state.privateBoards);
  useEffect(() => {
    if (couple_id && is_matching) {
      dispatch(getPrivateBoards(couple_id));
    }
  }, [dispatch, couple_id, is_matching]);

  return (
    <div className="bg-hibye-10 h-16">
      <div className="inner p-4">
        <GiHamburgerMenu className={`text-3xl absolute left-4 cursor-pointer ${isActive ? "text-hibye-60" : "text-hibye-80"}`} onClick={click} />
        <div ref={navRef} className="absolute top-16">
          {isActive ? <Navbar click={click} publicBoards={publicBoards} privateBoards={privateBoards} couple_id={couple_id} is_matching={is_matching} /> : null}
        </div>
        <Link to="/" className="text-hibye-80 text-3xl font-bold absolute left-1/2 -translate-x-2/4">
          HiBye
        </Link>
        <div className="flex absolute right-4">
          {id ? (
            <>
              {d_day ? (
                <div className="pt-1">
                  <span className="text-hibye-60 text-base font-bold mr-1">♡</span>
                  <span className="text-hibye-60 text-base">{d_day}</span>
                  <span className="text-hibye-60 text-sm font-bold ml-1">Days</span>
                </div>
              ) : null}
              <button className="button--pink ml-6" onClick={() => dispatch(removeUserInfo())}>
                Sign Out
              </button>
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
      <PrivateBoardCreateModal couple_id={couple_id} />
    </div>
  );
}
