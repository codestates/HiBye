import { BsArrowUp } from "react-icons/bs";
export default function TopBtn() {
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <BsArrowUp onClick={onClick} className="fixed bottom-10 right-20 z-50 text-5xl text-hibye-80 border-2 border-solid border-hibye-80 p-2 rounded-full" />;
}
