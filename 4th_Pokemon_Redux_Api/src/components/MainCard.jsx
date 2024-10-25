import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPokemonData,
  fetchNextPokemonData,
  fetchPreviousPokemonData,
} from "../features/PokemonCardSlice";
import Pokemons from "./Pokemons.jsx";
import Spinner from "./Spinner.jsx";

const MainCard = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);
  const [nextLoading, setNextLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllPokemonData());
  }, [dispatch]);

  const handleNext = () => {
    setNextLoading(true); // Set loading to true
    dispatch(fetchNextPokemonData()).finally(() => {
      // After fetching, reset loading after 1 seconds
      setTimeout(() => {
        setNextLoading(false);
      }, 1000);
    });
  };

  const handlePrevious = () => {
    setNextLoading(true); // Set loading to true
    dispatch(fetchPreviousPokemonData()).finally(() => {
      setTimeout(() => {
        setNextLoading(false);
      }, 800);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col ">
      {nextLoading ? (
        <div className="w-full h-svh flex flex-col justify-center items-center p-12 gap-4">
          <Spinner />
          {/* <div className="text-6xl text-blue-500">Wait..😏😏😏</div> */}
        </div>
      ) : (
        <Pokemons pokemons={pokemons} />
      )}

      <div className="w-full flex justify-between items-center p-12 gap-4">
        <button
          onClick={handlePrevious}
          className="w-[128px] bg-blue-500 hover:bg-blue-700 text-white border rounded px-4 py-2"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="w-[128px] bg-blue-500 hover:bg-blue-700 text-white border rounded px-4 py-2"
        >
          {nextLoading ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default MainCard;
