// @flow
import * as React from "react";
import { useStoreState, useStoreActions } from "easy-peasy";
import { Modal, List, Icon } from "antd-mobile";
import styled from "styled-components";
import { capitalizeFirstLetter, getPokemonImage } from "../../utils";

const { Item } = List;
const { Brief } = Item;
const { alert } = Modal;

const Header = styled.div`
  width: 100%;
  height: 32px;
  padding-top: 12px;
  box-shadow: 1px 1px 4px #9e9e9e;
  background-color: white;
  font-weight: bold;
  text-align: center;
`;

const Description = styled(Item)`
  border-top: 0.5px solid rgb(232, 232, 232);
  width: 100%;
`;

const StyledImage = styled.img`
  border-top: 0.5px solid rgb(232, 232, 232);
`;

export default function MyPokemon(): React.Node {
  const { pokemons } = useStoreState(state => state.myPokemon);
  const { releasePokemon } = useStoreActions(action => action.myPokemon);

  const releaseIt = nickname => {
    if (releasePokemon(nickname)) {
      alert(`${nickname} is released !`, "go catch another pokemon", [
        { text: "Okay" }
      ]);
    } else {
      alert("Sorry", "something went error", [{ text: "Okay" }]);
    }
  };

  return (
    <>
      <Header>My Pokemon</Header>
      {pokemons && pokemons.length > 0 ? (
        <List>
          {pokemons.map(({ id, pokemon, nickname }) => {
            return (
              <div style={{ display: "flex" }} key={nickname}>
                <StyledImage src={getPokemonImage(id)} alt={pokemon} />
                <Description
                  extra={
                    <Icon
                      type="cross-circle"
                      onClick={() => releaseIt(nickname)}
                    />
                  }
                  arrow="empty"
                >
                  {pokemon && capitalizeFirstLetter(pokemon)}
                  <Brief>{nickname}</Brief>
                </Description>
              </div>
            );
          })}
        </List>
      ) : (
        <center>
          <br />
          <h3>You have no pokemon, go catch some !</h3>
        </center>
      )}
    </>
  );
}
