import BoardCard from "./BoardCard";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css/pagination";
import { useSelector } from "react-redux";

SwiperCore.use([Pagination, Autoplay]);

export default function BoardCards() {
  const boards = [
    { name: "Daily Romantic", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
    { name: "Hot News", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
    { name: "Date Night", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Check your neighbour’s romantic stories." },
  ];

  const publicboards = useSelector((state) => state.publicBoards);
  const getPublicboards = () => {
    if (!(publicboards.data.data === undefined)) {
      return publicboards.data.data;
    }
    return boards;
  };

  return (
    <>
      <Swiper
        pagination={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {getPublicboards().map((board) => {
          return (
            <SwiperSlide className="w-fit">
              <BoardCard board={board} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );

  // new Swiper(".swiper-container", {
  //   direction: "horizontal",
  //   slidesPerView: 3,
  //   spaceBetween: 10,
  //   centeredSlides: true,
  //   loop: true,
  //   autoplay: {
  //     delay: 500
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });
  // return (
  // <div className="flex justify-center items-center w-screen overflow-hidden">
  //   <div className="flex w-fit p-10">
  //     <LeftBtn />
  //     <RightBtn />
  // <div className="swiper-container">
  // <div className="swiper-wrapper">
  // {boards.map((board) => {
  // return <BoardCard className="swiper-slide" board={board} />;
  // })}
  // </div>
  // </div>
  //   </div>
  // </div>
  // );
}
