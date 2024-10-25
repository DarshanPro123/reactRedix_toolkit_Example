import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPokemonData,
  fetchNextPokemonData,
  fetchPreviousPokemonData,
} from "../features/PokemonCardSlice";
import Pokemons from "./Pokemons.jsx";

const MainCard = () => {
  const dispatch = useDispatch();
  const { pokemons, loading, error } = useSelector((state) => state.pokemon);

  useEffect(() => {
    // fetch all Pokémon after  2 seconds

    dispatch(fetchAllPokemonData());
  }, [dispatch]);

  const handleNext = () => {
    dispatch(fetchNextPokemonData());
  };

  const handlePrevious = () => {
    dispatch(fetchPreviousPokemonData());
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col ">
      <Pokemons pokemons={pokemons} />

      <div className="w-full flex justify-between  items-center p-12 gap-4">
        <button
          onClick={handlePrevious}
          className=" w-[128px] bg-blue-500 hover:bg-blue-700 text-white border rounded px-4 py-2 "
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="w-[128px] bg-blue-500 hover:bg-blue-700 text-white border rounded px-4 py-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MainCard;
