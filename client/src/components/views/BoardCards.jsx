import LeftBtn from "../Button/LeftBtn";
import RightBtn from "../Button/RightBtn";
import BoardCard from "./BoardCard";

export default function BoardCards() {
  const boards = [
    { name: "Daily Romantic", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
    { name: "Hot News", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
    { name: "Date Night", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
  ];
  return (
    <div className="flex justify-center items-center w-screen overflow-hidden">
      <div className="flex w-fit p-10">
        <LeftBtn />
        <RightBtn />
        {boards.map((board) => {
          return <BoardCard board={board} />;
        })}
      </div>
    </div>
  );
}
