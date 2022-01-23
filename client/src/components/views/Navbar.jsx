import PublicBoards from "../views/PublicBoards";
import PrivateBoards from "../views/PrivateBoards";
import { BsChatDots, BsPencilSquare, BsListUl } from "react-icons/bs";

export default function Navbar({ click }) {
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

  // Todo: 서버에서 받아오는거 구현 후 로딩까지 넣기
  const publicBoards = [
    { name: "테스트보드", id: 1, category: "post" },
    { name: "테스트보드", id: 2, category: "post" },
    { name: "테스트보드", id: 3, category: "chat" },
    { name: "테스트보드", id: 4, category: "chat" },
    { name: "테스트보드이름이 정말정말정말정말정말 길때", id: 5, category: "todolist" },
  ];
  const privateBoards = [
    { name: "테스트보드", id: 1, category: "post" },
    { name: "테스트보드", id: 2, category: "post" },
    { name: "테스트보드", id: 3, category: "chat" },
    { name: "테스트보드", id: 4, category: "chat" },
    { name: "테스트보드이름이 정말정말정말정말정말 길때", id: 5, category: "todolist" },
  ];

  return (
    <div className="bg-hibye-10 p-4 text-hibye-60 absolute z-50 -translate-x-4 block max-w-xs">
      <PublicBoards boards={publicBoards} click={click} choseIcon={choseIcon} />
      {privateBoards.length === 0 ? null : <PrivateBoards boards={privateBoards} click={click} choseIcon={choseIcon} />}
    </div>
  );
}
