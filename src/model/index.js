import { action } from "easy-peasy";

const myPokemon = {
  pokemons: [{ pokemon: "bulbasaur", nickname: "bulby" }],
  catchPokemon: action((state, payload) => {
    // Object.assign(state.pokemons, { ...payload });
    state.pokemons.push(payload);
  })
  // ownedTotal: computed(state => Object.values(state.pokemons).length)
};

const catchRate = {
  success: 0,
  failed: 0,
  catchSuccess: action((state, payload) => {
    state.success = payload;
  }),
  catchFailed: action((state, payload) => {
    state.failed = payload;
  })
};

export default { myPokemon, catchRate };
