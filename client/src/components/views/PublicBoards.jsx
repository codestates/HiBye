import { Link } from "react-router-dom";
import Spinner from "../Spinner";

export default function PublicBoards({ boards, click, choseIcon }) {
  return (
    <>
      <div className="text-2xl text-hibye-80 font-bold mb-5">Boards</div>
      {boards.loading || boards.error ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        boards.data.data.map((board) => (
          <Link to={`/${board.category}/${board.id}`} key={board.id} className="mb-4 truncate block hover:text-hibye-80 duration-300" onClick={click}>
            {choseIcon(board.category)} {board.name}
          </Link>
        ))
      )}
    </>
  );
}
