import * as React from "react";
import axios from "axios";
import { useStoreState } from "easy-peasy";
import { List, ActivityIndicator, Badge } from "antd-mobile";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils";

export default function Home(): React.Node {
  const [pokemonList, setPokemonList] = React.useState([]);
  const [fetchOffset, setFetchOffset] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const { pokemons } = useStoreState(store => store.myPokemon);
  const limit = 10; // total pokemon per fetch
  const Item = List.Item;
  const Brief = Item.Brief;

  const fetchMore = () => setFetchOffset(fetchOffset + limit);

  const handleScroll = React.useCallback(() => {
    const scrollTop: HTMLElement | number | null =
      document.documentElement && document.documentElement.scrollTop; // html Element
    const offsetHeight: HTMLElement | number | null =
      document.getElementById("root") &&
      document.getElementById("root").offsetHeight; // root Element
    const tabBarHeight = 54;
    console.log(
      `${window.innerHeight}+${scrollTop} = ${window.innerHeight +
        scrollTop} x ${offsetHeight + tabBarHeight}`
    );

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
      setFetching(true);
      axios
        .get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${fetchOffset}&limit=${limit}`
        )
        .then(response => {
          setPokemonList(
            [...pokemonList, ...response.data.results],
            console.log(pokemonList)
          );
          setFetching(false);
        });
    }

    getPokemonList();
  }, [fetchOffset]);

  const pokemonOwned = pokemons.length;
  const pokemonImage = id =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div>
      <div style={{ padding: 16, textAlign: "center" }}>
        Pokemon Owned : <Badge text={pokemonOwned} />
        <br />
        <b>Go catch them all !</b>
      </div>
      <List>
        {pokemonList.map((pokemon, index) => {
          const id = index + 1;
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
                  {capitalizeFirstLetter(pokemon.name)}
                  <Brief>#{id}</Brief>
                </Item>
              </div>
            </Link>
          );
        })}
        <div
          align="center"
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: 16,
            marginLeft: "32%",
            marginBottom: 16
          }}
        >
          <ActivityIndicator text="Loading..." />
        </div>
      </List>
    </div>
  );
}
