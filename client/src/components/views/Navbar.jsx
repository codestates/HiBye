import PublicBoards from "../views/PublicBoards";
import PrivateBoards from "../views/PrivateBoards";
import { BsChatDots, BsPencilSquare, BsListUl } from "react-icons/bs";

export default function Navbar({ click, publicBoards, privateBoards, couple_id, is_matching }) {
  // 카테고리 별로 아이콘 선택하는 함수
  const choseIcon = (category) => {
    if (category === "post") return <BsPencilSquare className="inline mr-2 mb-1" />;
    if (category === "chat") {
      return (
        <BsChatDots
          style={{
            transform: "scaleX(-1)",
          }}
          className="inline mr-2 mb-1"
        />
      );
    }
    if (category === "todolist") return <BsListUl className="inline mr-2 mb-1" />;
  };

  return (
    <div className="bg-hibye-10 p-4 text-hibye-60 absolute z-50 -translate-x-4 block max-w-xs bg-opacity-95">
      <PublicBoards boards={publicBoards} click={click} choseIcon={choseIcon} />
      {couple_id && is_matching ? <PrivateBoards boards={privateBoards} click={click} choseIcon={choseIcon} /> : null}
    </div>
  );
}
