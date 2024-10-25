import React from "react";

const Spinner = () => {
  return (
    <div>
      {/* <div
        class="w-12 h-12 rounded-full animate-spin
                    border-4 border-dashed border-blue-500 border-t-transparent"
      ></div> */}

      <section class="bg-blue-900 relative place-items-center grid h-screen w-screen gap-4">
        <img
          className="w-24 h-24 opacity-[0.7]  animate-spin delay-1000  rounded-full shadow-xl z-20"
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/5.png"
          alt=""
        />
        <div class="bg-blue-300 w-80 h-80  absolute animate-ping rounded-full delay-5s shadow-xl"></div>

        <div class="bg-blue-400 w-44 h-44 absolute animate-ping rounded-full shadow-xl"></div>

        <div class="bg-white w-24 h-24 absolute animate-pulse rounded-full shadow-xl"></div>
      </section>
    </div>
  );
};

export default Spinner;
