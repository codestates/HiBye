import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modules/privateBoardCreateModal";
import PlusBtn from "../Button/PlusBtn";
import Spinner from "../Spinner";

export default function PrivateBoards({ boards, click, choseIcon }) {
  // Create Modal 여는 액션
  const dispatch = useDispatch();
  const open = () => {
    dispatch(openModal());
    click();
  };

  return (
    <>
      <hr className="border border-solid border-hibye-60 mt-2 mb-6"></hr>
      <div className="flex justify-between align-middle mb-5">
        <div className="text-2xl text-hibye-80 font-bold w-max">Couple Boards</div>
        <div onClick={open} className="self-center ml-4">
          <PlusBtn />
        </div>
      </div>
      {boards.loading || boards.error ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : boards.data.data.length === 0 ? (
        <div className="border-hibye-60">There is no board.</div>
      ) : (
        boards.data.data.map((board) => (
          <Link to={`/${board.category}/${board.id}?page=1&search=`} key={board.id} className="mb-4 truncate block hover:text-hibye-80 duration-300" onClick={click}>
            {choseIcon(board.category)} {board.name}
          </Link>
        ))
      )}
    </>
  );
}
