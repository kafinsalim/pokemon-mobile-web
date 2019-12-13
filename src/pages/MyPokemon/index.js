import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Button, Modal, List } from "antd-mobile";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils";

export default function MyPokemon(): React.Node {
  const { myPokemon, catchRate } = useStoreState(state => state);
  const catchRateAction = useStoreActions(action => action.catchRate);
  const myPokemonAction = useStoreActions(action => action.myPokemon);

  const { pokemons } = myPokemon;
  const { success, failed } = catchRate;
  const { prompt } = Modal;
  const Item = List.Item;
  const Brief = Item.Brief;

  // function handleCatch() {
  //   const { success, failed } = catchRate;
  //   const { catchSuccess, catchFailed } = catchRateAction;
  //   if (Math.random() >= 0.5) {
  //     catchSuccess(success + 1);
  //   } else {
  //     catchFailed(failed + 1);
  //   }
  // }

  // function handleTamePokemon(pokemon, nickname) {
  //   const { pokemons } = myPokemon;
  //   const { catchPokemon } = myPokemonAction;
  //   const newPokemon = { pokemon, nickname };
  //   catchPokemon(newPokemon);
  //   console.log(`cathed ${pokemon}:${nickname}`);
  // }

  console.log("render", {
    myPokemon,
    catchRate,
    myPokemonAction,
    catchRateAction
  });

  const pokemonImage = id =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div>
      <div
        style={{
          width: "100%",
          height: 42,
          paddingTop: 12,
          paddingLeft: 32,
          boxShadow: "1px 1px 4px #9E9E9E",
          backgroundColor: "white",
          // color: "#2eac0d",
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        My Pokemon
      </div>
      <List>
        {pokemons.map(({ id, pokemon, nickname }) => {
          const image = pokemonImage(id);
          return (
            <Link to={`detail/${id}`} key={id}>
              <div
                style={{
                  display: "flex"
                }}
              >
                <img
                  src={image}
                  onLoad={() => console.log("img ready")}
                  alt={pokemon}
                  style={{ borderTop: "0.5px solid rgb(232, 232, 232)" }}
                />
                <Item
                  arrow="horizontal"
                  style={{
                    borderTop: "0.5px solid rgb(232, 232, 232)",
                    width: "100%"
                  }}
                >
                  {pokemon && capitalizeFirstLetter(pokemon)}
                  <Brief>{nickname}</Brief>
                </Item>
              </div>
            </Link>
          );
        })}
      </List>
      {/* <h4>Catch Rate</h4>
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
      </Button> */}
    </div>
  );
}
