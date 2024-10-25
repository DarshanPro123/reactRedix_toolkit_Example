import React from "react";

const Pokemons = ({ pokemons }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemons.map((pokemon, i) => (
        <div
          key={pokemon.name}
          className="p-4 gap-2 blur-sm hover:blur-0 border hover:scale-105 cursor-pointer text-gray-50  border-gray-400 rounded"
        >
          {i + 1}
          {pokemon.image && <img src={pokemon.image} alt={pokemon.name} />}
          <h3 className="text-4xl m-2  uppercase">{pokemon.name}</h3>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
        </div>
      ))}
    </div>
  );
};

export default Pokemons;
