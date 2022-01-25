import { BiMessageAltCheck } from "react-icons/bi";
export default function BoardCard({ board }) {
  return (
    <div className="inner h-fit p-4">
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-hibye-20 to-hibye-60 p-12 text-center rounded-2xl">
        <h1 className="mb-8 text-2xl font-bold text-hibye-80">{board.name}</h1>
        <BiMessageAltCheck className="text-6xl mb-4 text-hibye-20" />
        <p className="w-96 text-hibye-80 mb-8">{board.desc}</p>
        <button className="w-32 h-10 border border-solid border-hibye-80 rounded-full mb-12 text-hibye-80">Go</button>
      </div>
    </div>
  );
}
