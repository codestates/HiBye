import { MdOutlineCancel } from "react-icons/md";

export default function CancelBtn() {
  return <MdOutlineCancel className="text-2xl text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300" />;
}

export function CancelBtnSmall() {
  return <MdOutlineCancel className="text-xs text-hibye-80 hover:text-hibye-10 hover:bg-hibye-80 rounded-full cursor-pointer duration-300" />;
}
