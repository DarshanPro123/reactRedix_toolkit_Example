import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all Pokémon names
export const fetchPokemonNames = createAsyncThunk(
  "pokemon/fetchNames",
  async (url = "https://pokeapi.co/api/v2/pokemon") => {
    const response = await axios.get(url);
    return response.data; // This returns the list of Pokémon
  }
);

// Async thunk to fetch detailed information for a Pokémon
export const fetchPokemonDetails = createAsyncThunk(
  "pokemon/fetchDetails",
  async (url) => {
    const response = await axios.get(url);
    return response.data; // This returns detailed info including images
  }
);

const pokemonCardSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemons: [],
    loading: false,
    error: null,
    nextUrl: null,
    previousUrl: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonNames.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemonNames.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemons = action.payload.results; // Update with fetched Pokémon
        state.nextUrl = action.payload.next; // Set the next URL for pagination
        state.previousUrl = action.payload.previous; // Set the previous URL if exists
      })
      .addCase(fetchPokemonNames.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPokemonDetails.fulfilled, (state, action) => {
        const pokemonDetail = action.payload;
        const existingPokemon = state.pokemons.find(
          (p) => p.name === pokemonDetail.name
        );

        if (existingPokemon) {
          existingPokemon.image =
            pokemonDetail.sprites.other.home.front_default;
          existingPokemon.height = pokemonDetail.height;
          existingPokemon.weight = pokemonDetail.weight;
          // Add other properties as needed
        }
      });
  },
});

// Thunk to fetch all Pokémon data including their details
export const fetchAllPokemonData = () => async (dispatch) => {
  const initialData = await dispatch(fetchPokemonNames()).unwrap();

  // Fetch details for each Pokémon
  for (const pokemon of initialData.results) {
    await dispatch(fetchPokemonDetails(pokemon.url));
  }
};

// Thunk to fetch the next set of Pokémon
export const fetchNextPokemonData = () => async (dispatch, getState) => {
  const state = getState();
  const nextUrl = state.pokemon.nextUrl; // Get the next URL from the state

  if (nextUrl) {
    const nextData = await dispatch(fetchPokemonNames(nextUrl)).unwrap();
    // Fetch details for the new set of Pokémon
    for (const pokemon of nextData.results) {
      await dispatch(fetchPokemonDetails(pokemon.url));
    }
  }
};

export const fetchPreviousPokemonData = () => async (dispatch, getState) => {
  const state = getState();
  const previousUrl = state.pokemon.previousUrl; // Get the previous URL from the state

  if (previousUrl) {
    const previousData = await dispatch(
      fetchPokemonNames(previousUrl)
    ).unwrap();
    // Fetch details for the new set of Pokémon
    for (const pokemon of previousData.results) {
      await dispatch(fetchPokemonDetails(pokemon.url));
    }
  }
};

export default pokemonCardSlice.reducer;
