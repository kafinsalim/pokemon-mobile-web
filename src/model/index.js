import { action } from "easy-peasy";

const myPokemon = {
  pokemons: [],
  catchPokemon: action((state, payload) => {
    state.pokemons.push(payload);
  }),
  releasePokemon: action(async (state, payload) => {
    console.log("releasePokemon", payload);
    // release pokemon by its nickname
    const { pokemons } = state;
    const index = pokemons.findIndex(pokemon => pokemon.nickname === payload);
    if (index >= 0) pokemons.splice(index, 1);
  })
};

export default { myPokemon };
