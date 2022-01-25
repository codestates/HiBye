import BoardCards from "../components/views/BoardCards";

function Main() {
  return (
    <div className="bg-hibye-10">
      {/* banner */}
      <section className="w-screen h-fit bg-gradient-to-r from-hibye-60 to-hibye-80 pt-12">
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
      </section>
      {/* boardCards */}
      <section>
        <BoardCards />
        <div className="mb-12 flex justify-center items-center">
          <span className="block w-2 h-2 border-2 border-hibye-60 rounded-full mr-1 ml-1 bg-hibye-60"></span>
          <span className="block w-2 h-2 border-2 border-hibye-60 rounded-full mr-1 ml-1"></span>
          <span className="block w-2 h-2 border-2 border-hibye-60 rounded-full mr-1 ml-1"></span>
        </div>
      </section>
      {/* descriptions */}
      <section className="mt-32 mb-32">
        <div className="inner relative">
          <div>
            <h1 className="mb-32 text-6xl text-hibye-80 font-bold">HiBye</h1>
            <h2 className="text-bold text-hibye-60 text-3xl mb-4">Social Community</h2>
            <p className="w-80 leading-tight pb-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi minima corporis placeat, quisquam at neque laudantium quos aspernatur cum soluta perferendis enim porro odit recusandae,
              atque debitis, nam quis dolor?
            </p>
            <button className="w-32 h-10 border border-hibye-80 border-solid rounded-full mb-12 text-hibye-80 mb-96">Go</button>
          </div>
          <div className="w-1/2 h-96 bg-hibye-20 absolute top-32 right-0"></div>
          <div className="w-80 h-3/5 bg-hibye-60 absolute top-80 right-1/2 translate-x-1/2 border-8 border-hibye-10 rounded-t-full"></div>
        </div>
      </section>
      <section className="mt-32">
        <div className="inner">
          <div className="flex flex-col items-end">
            <h1 className="mb-32 text-6xl text-hibye-80 font-bold text-right">HiBye</h1>
            <h2 className="text-bold text-hibye-60 text-3xl text-right mb-4">Private Lounge</h2>
            <p className="w-80 leading-tight text-right pb-8">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Modi minima corporis placeat, quisquam at neque laudantium quos aspernatur cum soluta perferendis enim porro odit recusandae,
              atque debitis, nam quis dolor?
            </p>
            <button className="w-32 h-10 border border-hibye-80 border-solid rounded-full mb-12 text-hibye-80 mb-96">Go</button>
          </div>
          <div className="w-3/5 h-3/5 bg-hibye-20 absolute top-32 left-0"></div>
        </div>
      </section>
      {/* contact */}
      <section className="w-screen h-screen bg-hibye-10 flex justify-center items-center">
        <div className="w-72 font-light text-6xl text-center text-hibye-80">
          just say <span className="font-bold">Hi</span> and <span className="font-bold">Bye.</span>
        </div>
      </section>
    </div>
  );
}

export default Main;
