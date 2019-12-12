import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Button, Modal } from "antd-mobile";

export default function MyPokemon(): React.Node {
  const { myPokemon, catchRate } = useStoreState(state => state);
  const catchRateAction = useStoreActions(action => action.catchRate);
  const myPokemonAction = useStoreActions(action => action.myPokemon);
  console.log("myPokemon", myPokemon);
  console.log("catchRate", catchRate);
  const { pokemons } = myPokemon;
  const { success, failed } = catchRate;
  const { prompt } = Modal;

  function handleCatch() {
    const { success, failed } = catchRate;
    // catchRateAction.catchSuccess(success + 1);
    console.log("catchRateAction", catchRate);
    // const { success, failed } = catchRate;
    const { catchSuccess, catchFailed } = catchRateAction;
    if (Math.random() >= 0.5) {
      catchSuccess(success + 1);
    } else {
      catchFailed(failed + 1);
    }
  }

  function handleTamePokemon(pokemon, nickname) {
    const { pokemons } = myPokemon;
    const { catchPokemon } = myPokemonAction;
    const newPokemon = { pokemon, nickname };
    catchPokemon(newPokemon);
    console.log(`cathed ${pokemon}:${nickname}`);
  }

  console.log("render", {
    myPokemon,
    catchRate,
    myPokemonAction,
    catchRateAction
  });
  return (
    <div>
      <h4>My Pokemon</h4>
      <ul>
        {pokemons &&
          pokemons.map(({ pokemon, nickname }) => (
            <li>
              {pokemon} - {nickname}
            </li>
          ))}
      </ul>
      <h4>Catch Rate</h4>
      success: {success} failed: {failed}
      <Button type="primary" onClick={handleCatch}>
        CATCH
      </Button>
      <Button
        onClick={() =>
          prompt(
            "Pokemon Nickname",
            "defaultValue for prompt",
            [
              { text: "Release" },
              {
                text: "Catch",
                onPress: value => handleTamePokemon("momon", value)
              }
            ],
            "default",
            "momon"
          )
        }
      >
        Catch ayo
      </Button>
    </div>
  );
}
