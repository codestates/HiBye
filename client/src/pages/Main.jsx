import BoardCards from "../components/views/BoardCards";

function Main() {
  return (
    <div>
      {/* banner */}
      <div className="w-screen h-fit bg-gradient-to-r from-hibye-60 to-hibye-80 pt-12">
        <div className="inner text-7xl uppercase text-hibye-20 font-light">
          <span className="block">it is always better</span>
          <span className="block">when we are together.</span>
        </div>
        <div className="inner">
          <span className="block w-60 text-sm mt-12 mb-12 text-hibye-20">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae enim at lorem ullamcorper finibus eget sed felis. Pellentesque non tortor malesuada, tincidunt mi in, vulputate
            felis.
          </span>
        </div>
        <div className="inner flex justify-between">
          <button className="w-32 h-10 border border-solid rounded-full mb-12 text-hibye-20">Go</button>
          <div className="text-hibye-20 font-bold">HiBye</div>
        </div>
      </div>
      {/* boardCards */}
      <BoardCards />
    </div>
  );
}

export default Main;
