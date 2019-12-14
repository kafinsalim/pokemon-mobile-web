import * as React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { List, ActivityIndicator, Badge } from "antd-mobile";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { capitalizeFirstLetter, getPokemonImage } from "../../utils";

const Item = List.Item;
const Brief = Item.Brief;

const Header = styled.div`
  width: 100%;
  height: 42px;
  padding-top: 12px;
  box-shadow: 1px 1px 4px #9e9e9e;
  background-color: white;
  text-align: center;
  color: #2eac0d;
  font-weight: bold;
`;

const ItemContainer = styled(Link)`
  display: flex;
`;

const Center = styled.div`
  width: 100%;
  background-color: white;
  padding: 16px;
  margin-left: 35%;
  margin-bottom: 16px;
`;

const ItemContent = styled(Item)`
  border-top: 0.5px solid rgb(232, 232, 232);
  width: 100%;
`;

const StyledImage = styled.img`
  border-top: 0.5px solid rgb(232, 232, 232);
`;

export default function Home(): React.Node {
  const [pokemonList, setPokemonList] = React.useState([]);
  const [fetchOffset, setFetchOffset] = React.useState(0);
  const { pokemons } = useStoreState(store => store.myPokemon);
  const limit = 20; // total pokemon per fetch

  const fetchMore = () => setFetchOffset(fetchOffset + limit);

  const handleScroll = React.useCallback(() => {
    const scrollTop: HTMLElement | number | null =
      document.documentElement && document.documentElement.scrollTop; // html Element
    const offsetHeight: HTMLElement | number | null =
      document.getElementById("root") &&
      document.getElementById("root").offsetHeight; // root Element
    const tabBarHeight = 54;
    // do nothing if scrollY !reach bottom
    if (window.innerHeight + scrollTop !== offsetHeight + tabBarHeight) return;
    // else do
    fetchMore(); // TODO: throttle fetching
  }, [fetchMore]);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  React.useEffect(() => {
    function getPokemonList() {
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${fetchOffset}&limit=${limit}`
        )
        .then(response => {
          setPokemonList([...pokemonList, ...response.data.results]);
        });
    }

    getPokemonList();
  }, [fetchOffset]);

  const pokemonOwned = pokemons.length.toString();

  return (
    <div>
      <Header>POKEMONPEDIA</Header>
      <div style={{ padding: 16, textAlign: "center" }}>
        Pokemon Owned : <Badge text={pokemonOwned} />
        <br />
        <b>Go catch them all !</b>
      </div>
      <List>
        {pokemonList.map((pokemon, index) => {
          const id = index + 1;
          return (
            <ItemContainer to={`detail/${id}`} key={id}>
              <StyledImage src={getPokemonImage(id)} alt={pokemon} />
              <ItemContent arrow="horizontal">
                {capitalizeFirstLetter(pokemon.name)}
                <Brief>#{id}</Brief>
              </ItemContent>
            </ItemContainer>
          );
        })}
        <Center>
          <ActivityIndicator text="Loading..." />
        </Center>
      </List>
    </div>
  );
}
