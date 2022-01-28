export default function Footer() {
  return (
    <div className="bg-hibye-100 h-96 text-hibye-10">
      <div className="inner py-20 px-4">
        <div className="flex justify-between mb-8">
          <div className="text-2xl font-bold">SuSangYuHee</div>
          <div className="text-sm">Copyright©SuSangYuHee</div>
        </div>
        <div className="flex justify-between">
          <div className="text-sm">
            <a href="https://github.com/strawberryoolongtea" className="block">
              Subin kim
            </a>
            <a href="https://github.com/ParkSangBong" className="block">
              Sangbong Park
            </a>
            <a href="https://github.com/YuchanJeong" className="block">
              Yuchan Jeong
            </a>
            <a href="https://github.com/jenjenhub" className="block">
              Gangheena Kim
            </a>
          </div>
          <div className="self-end text-2xl font-bold">HiBye</div>
        </div>
      </div>
    </div>
  );
}
